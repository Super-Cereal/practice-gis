import { createStore, sample, createEvent } from 'effector';
import { nanoid } from 'nanoid';

import { editorPointsModel } from './editor-points.model';
import type { EditorLine } from './types';

const $lines = createStore<Record<EditorLine['_id'], EditorLine>>({});
const $selectedLines = sample({
    clock: $lines,
    fn: (lines) => Object.values(lines).filter(({ selected }) => selected),
});

/** Создать линию из выбранных точек */
const createLine = createEvent();
sample({
    clock: createLine,
    source: { lines: $lines, points: editorPointsModel.$points },
    fn: ({ lines, points }) => {
        const selectedPoints = Object.values(points).filter((point) => point.selected);

        const newLine: EditorLine = {
            _id: nanoid(),
            coordinates: selectedPoints.map(({ coordinates }) => coordinates),
            selected: true,
        };

        return { ...lines, [newLine._id]: newLine };
    },
    target: $lines,
});

/** Добавить/убрать выделение линии по _id */
const toggleLineSelect = createEvent<EditorLine['_id']>();
sample({
    clock: toggleLineSelect,
    source: $lines,
    fn: (lines, LineId) => {
        const Line = lines[LineId];

        return { ...lines, [Line._id]: { ...Line, selected: !Line.selected } };
    },
    target: $lines,
});

/** Убрать выделение линии */
const removeLinesSelection = createEvent();
sample({
    clock: removeLinesSelection,
    source: $selectedLines,
    fn: (lines) => lines.forEach(({ _id }) => toggleLineSelect(_id)),
});

/** Удалить линию */
const deleteLine = createEvent<EditorLine['_id']>();
sample({
    clock: deleteLine,
    source: $lines,
    fn: (lines, LineId) => {
        const copiedLine = { ...lines };
        delete copiedLine[LineId];

        return copiedLine;
    },
    target: $lines,
});

/** Удалить выделеные линии */
const deleteSelectedLines = createEvent();
sample({
    clock: deleteSelectedLines,
    source: $selectedLines,
    fn: (lines) => lines.forEach(({ _id }) => deleteLine(_id)),
});

export const editorLinesModel = {
    $lines,
    $selectedLines,
    createLine,
    toggleLineSelect,
    removeLinesSelection,
    deleteLine,
    deleteSelectedLines,
};
