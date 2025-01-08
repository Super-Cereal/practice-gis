import type { LatLngTuple } from 'leaflet';
import { Feature } from '../../../entities/geoobject/model/types';
import { nanoid } from 'nanoid';

interface Obj {
    /**
     * _id - только фронтовый, бэк создает свои.
     * В сохраненных геообьектах работаем с их id
     */
    _id: string;

    /** Выбран ли обьект */
    selected?: boolean;

    /** Может быть выбран, но не может быть удален */
    readonly?: boolean;
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

export function featureToEditorObject(feature: Feature): EditorObject {
    const { geometry, properties } = feature;

    if (geometry.type === 'Polygon' || geometry.type === 'PolyLine') {
        return {
            _id: nanoid(),
            type: geometry.type === 'Polygon' ? 'Polygon' : 'PolyLine',
            coordinates: geometry.coordinates[0] as LatLngTuple[],
            selected: properties.selected ?? false,
            readonly: properties.readonly ?? false,
        };
    }

    throw new Error(`Unsupported geometry type: ${geometry.type}`);
}
