import type { LatLngTuple } from 'leaflet';

export interface EditorPoint {
    id: string;
    coordinates: LatLngTuple;
    selected?: boolean | undefined;
}

export interface EditorPolygon {
    id: string;
    points: EditorPoint[];
    selected?: boolean | undefined;
}
