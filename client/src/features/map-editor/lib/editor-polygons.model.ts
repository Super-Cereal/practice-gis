import { createStore, sample, createEvent } from 'effector';
import { nanoid } from 'nanoid';

import { editorPointsModel } from './editor-points.model';
import type { EditorPolygon } from './types';

const $polygons = createStore<Record<EditorPolygon['id'], EditorPolygon>>({});

/** Создать полигон из выбранных точек */
const createPolygon = createEvent();
sample({
    clock: createPolygon,
    source: { polygons: $polygons, points: editorPointsModel.$points },
    fn: ({ polygons, points }) => {
        const selectedPoints = Object.values(points).filter((point) => point.selected);

        const newPolygon: EditorPolygon = {
            id: nanoid(),
            points: selectedPoints,
            selected: true,
        };

        return { ...polygons, [newPolygon.id]: newPolygon };
    },
    target: $polygons,
});

/** Добавить/убрать выделение полигону по id */
const togglePolygonSelect = createEvent<EditorPolygon['id']>();
sample({
    clock: togglePolygonSelect,
    source: $polygons,
    fn: (polygons, polygonId) => {
        const polygon = polygons[polygonId];

        return { ...polygons, [polygon.id]: { ...polygon, selected: !polygon.selected } };
    },
    target: $polygons,
});

/** Удалить полигон */
const deletePolygon = createEvent<EditorPolygon['id']>();
sample({
    clock: deletePolygon,
    source: $polygons,
    fn: (polygons, polygonId) => {
        const copiedPolygon = { ...polygons };
        delete copiedPolygon[polygonId];

        return copiedPolygon;
    },
    target: $polygons,
});

export const editorPolygonsModel = {
    $polygons,
    createPolygon,
    togglePolygonSelect,
    deletePolygon,
};
