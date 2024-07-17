import type { LatLngTuple } from 'leaflet';

// _id - только фронтовый, бэк создает свои
// в сохраненных геообьектах работаем с их id

export type EditorObjectType = 'Point' | 'PolyLine' | 'Polygon';

export interface EditorPoint {
    _id: string;
    coordinates: LatLngTuple;
    selected?: boolean | undefined;
}

export interface EditorPolygon {
    _id: string;
    points: EditorPoint[];
    selected?: boolean | undefined;
}

export interface EditorLine {
    _id: string;
    points: EditorPoint[];
    selected?: boolean | undefined;
}
