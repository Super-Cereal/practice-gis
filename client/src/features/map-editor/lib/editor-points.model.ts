import { createStore, sample, createEvent } from 'effector';
import { nanoid } from 'nanoid';

import type { EditorPoint } from './types';

const $points = createStore<Record<EditorPoint['_id'], EditorPoint>>({});
const $selectedPoints = sample({
    clock: $points,
    fn: (points) => Object.values(points).filter(({ selected }) => selected),
});

/** Добавить точку по координатам */
const addPoint = createEvent<EditorPoint['coordinates']>();
sample({
    clock: addPoint,
    source: $points,
    fn: (points, coordinates) => {
        const newPoint: EditorPoint = {
            _id: nanoid(),
            coordinates,
            selected: true,
        };

        return { ...points, [newPoint._id]: newPoint };
    },
    target: $points,
});

/** Добавить/убрать выделение точке по _id */
const togglePointSelect = createEvent<EditorPoint['_id']>();
sample({
    clock: togglePointSelect,
    source: $points,
    fn: (points, pointId) => {
        const point = points[pointId];

        return { ...points, [point._id]: { ...point, selected: !point.selected } };
    },
    target: $points,
});

/** Убрать выделение точек */
const removePointsSelection = createEvent();
sample({
    clock: removePointsSelection,
    source: $selectedPoints,
    fn: (points) => points.forEach(({ _id }) => togglePointSelect(_id)),
});

/** Удалить точку */
const deletePoint = createEvent<EditorPoint['_id']>();
sample({
    clock: deletePoint,
    source: $points,
    fn: (points, pointId) => {
        const copiedPoints = { ...points };
        delete copiedPoints[pointId];

        return copiedPoints;
    },
    target: $points,
});

/** Удалить выделеные точки */
const deleteSelectedPoints = createEvent();
sample({
    clock: deleteSelectedPoints,
    source: $selectedPoints,
    fn: (points) => points.forEach(({ _id }) => deletePoint(_id)),
});

export const editorPointsModel = {
    $points,
    $selectedPoints,
    addPoint,
    togglePointSelect,
    removePointsSelection,
    deletePoint,
    deleteSelectedPoints,
};
