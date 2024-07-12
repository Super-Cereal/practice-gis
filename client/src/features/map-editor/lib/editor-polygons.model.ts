import { createStore, sample, createEvent } from 'effector';
import { nanoid } from 'nanoid';

import { editorPointsModel } from './editor-points.model';
import type { EditorPolygon } from './types';

const $polygons = createStore<Record<EditorPolygon['id'], EditorPolygon>>({});
const $selectedPolygons = sample({
    clock: $polygons,
    fn: (polygons) => Object.values(polygons).filter(({ selected }) => selected),
});

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

/** Убрать выделение полигонов */
const removePolygonSelection = createEvent();
sample({
    clock: removePolygonSelection,
    source: $selectedPolygons,
    fn: (polygons) => polygons.forEach(({ id }) => togglePolygonSelect(id)),
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

/** Удалить выделеные полигоны */
const deleteSelectedPolygons = createEvent();
sample({
    clock: deleteSelectedPolygons,
    source: $selectedPolygons,
    fn: (polygons) => polygons.forEach(({ id }) => deletePolygon(id)),
});

export const editorPolygonsModel = {
    $polygons,
    $selectedPolygons,
    createPolygon,
    togglePolygonSelect,
    removePolygonSelection,
    deletePolygon,
    deleteSelectedPolygons,
};
