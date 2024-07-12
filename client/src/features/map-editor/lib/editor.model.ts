import { createStore, sample, createEvent } from 'effector';

import type { Point, Polygon } from './types';

const $points = createStore<Record<Point['id'], Point>>({});
const addPoint = createEvent<Point>();
const togglePointSelect = createEvent<Point['id']>();

sample({
    clock: addPoint,
    source: $points,
    fn: (points, newPoint) => ({ ...points, [newPoint.id]: newPoint }),
    target: $points,
});

sample({
    clock: togglePointSelect,
    source: $points,
    fn: (points, pointIdToSelect) => {
        const point = points[pointIdToSelect];

        return { ...points, [point.id]: { ...point, selected: !point.selected } };
    },
    target: $points,
});

const $polygons = createStore<Polygon[]>([]);
const addPolygon = createEvent<Polygon>();

sample({
    clock: addPolygon,
    source: $polygons,
    fn: (polygons, newPolygon) => [...polygons, newPolygon],
    target: $polygons,
});

export const editorModel = {
    $points,
    addPoint,
    togglePointSelect,

    $polygons,
    addPolygon,
};
