import { createStore, sample, createEvent } from 'effector';
import { nanoid } from 'nanoid';

import { editorPointsModel } from './editor-points.model';
import type { EditorLine } from './types';

const $lines = createStore<Record<EditorLine['id'], EditorLine>>({});
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
            id: nanoid(),
            points: selectedPoints,
            selected: true,
        };

        return { ...lines, [newLine.id]: newLine };
    },
    target: $lines,
});

/** Добавить/убрать выделение линии по id */
const toggleLineSelect = createEvent<EditorLine['id']>();
sample({
    clock: toggleLineSelect,
    source: $lines,
    fn: (lines, LineId) => {
        const Line = lines[LineId];

        return { ...lines, [Line.id]: { ...Line, selected: !Line.selected } };
    },
    target: $lines,
});

/** Убрать выделение линии */
const removeLinesSelection = createEvent();
sample({
    clock: removeLinesSelection,
    source: $selectedLines,
    fn: (lines) => lines.forEach(({ id }) => toggleLineSelect(id)),
});

/** Удалить линию */
const deleteLine = createEvent<EditorLine['id']>();
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
    fn: (lines) => lines.forEach(({ id }) => deleteLine(id)),
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
