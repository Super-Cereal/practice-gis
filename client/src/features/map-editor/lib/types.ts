import type { LatLngTuple } from 'leaflet';

interface Obj {
    /**
     * _id - только фронтовый, бэк создает свои.
     * В сохраненных геообьектах работаем с их id
     */
    _id: string;
    selected?: boolean | undefined;
}

export interface EditorPoint extends Obj {
    type: 'Point';
    coordinates: LatLngTuple;
}

export interface EditorPolygon extends Obj {
    type: 'PolyLine';
    coordinates: LatLngTuple[];
}

export interface EditorPolyLine extends Obj {
    type: 'Polygon';
    coordinates: LatLngTuple[];
}

export type EditorObject = EditorPoint | EditorPolyLine | EditorPolygon;
