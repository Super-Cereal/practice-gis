import type { LatLngTuple } from 'leaflet';

import { type GeoObject, getGeometry } from '../../../entities/geoobject';
import type { EditorObject } from '../../map-editor';

export const mapGeoObjectToEditorObject = (geoObject: GeoObject): EditorObject => {
    const geometry = getGeometry(geoObject);

    if (!geometry) {
        throw new Error(`У обьекта поломана геометрия`);
    }

    let coordinates: LatLngTuple[] = [];

    if (geometry.type === 'Point') {
        coordinates = [[geometry.coordinates[0], geometry.coordinates[1]]];
    } else if (geometry.type === 'PolyLine' || geometry.type === 'Polygon') {
        coordinates = geometry.coordinates;
    }

    if (geometry.type === 'Point') {
        return {
            _id: geoObject.id,
            type: 'Point',
            coordinates: coordinates[0],
        };
    } else if (geometry.type === 'PolyLine') {
        return {
            _id: geoObject.id,
            type: 'PolyLine',
            coordinates,
        };
    } else if (geometry.type === 'Polygon') {
        return {
            _id: geoObject.id,
            type: 'Polygon',
            coordinates,
        };
    }

    throw new Error(`Unsupported geometry type: ${geometry.type}`);
};
