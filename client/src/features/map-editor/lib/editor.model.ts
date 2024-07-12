import { createStore, sample, createEvent } from 'effector';
import { nanoid } from 'nanoid';

import type { EditorPoint, EditorPolygon } from './types';

const $points = createStore<Record<EditorPoint['id'], EditorPoint>>({});
const $polygons = createStore<Record<EditorPolygon['id'], EditorPolygon>>({});

/** Добавить точку по координатам */
const addPoint = createEvent<EditorPoint['coordinates']>();
sample({
    clock: addPoint,
    source: $points,
    fn: (points, coordinates) => {
        const newPoint: EditorPoint = {
            id: nanoid(),
            coordinates,
            selected: true,
        };

        return { ...points, [newPoint.id]: newPoint };
    },
    target: $points,
});

/** Добавить/убрать выделение точке по id */
const togglePointSelect = createEvent<EditorPoint['id']>();
sample({
    clock: togglePointSelect,
    source: $points,
    fn: (points, pointIdToSelect) => {
        const point = points[pointIdToSelect];

        return { ...points, [point.id]: { ...point, selected: !point.selected } };
    },
    target: $points,
});

/** Создать полигон из выбранных точек */
const createPolygon = createEvent();
sample({
    clock: createPolygon,
    source: { polygons: $polygons, points: $points },
    fn: ({ polygons, points }) => {
        const selectedPoints = Object.values(points).filter((point) => point.selected);

        const newPolygon: EditorPolygon = {
            id: nanoid(),
            points: selectedPoints,
            selected: true,
        };

        selectedPoints.forEach((point) => togglePointSelect(point.id));

        return { ...polygons, [newPolygon.id]: newPolygon };
    },
    target: $polygons,
});

/** Добавить/убрать выделение полигону по id */
const togglePolygonSelect = createEvent<EditorPolygon['id']>();
sample({
    clock: togglePolygonSelect,
    source: $polygons,
    fn: (polygons, polygonIdToSelect) => {
        const polygon = polygons[polygonIdToSelect];

        return { ...polygons, [polygon.id]: { ...polygon, selected: !polygon.selected } };
    },
    target: $polygons,
});

export const editorModel = {
    $points,
    addPoint,
    togglePointSelect,

    $polygons,
    createPolygon,
    togglePolygonSelect,
};
