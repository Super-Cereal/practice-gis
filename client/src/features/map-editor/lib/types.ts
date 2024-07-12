import type { LatLngTuple } from 'leaflet';

export interface Point {
    id: string;
    coordinates: LatLngTuple;
    selected?: boolean | undefined;
}

export interface Polygon {
    id: string;
    points: Point[];
    selected?: boolean | undefined;
}
