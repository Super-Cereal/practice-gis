import type { GeoObject, GeometryGeoJSON } from '../model/types';

export const getGeometry = ({ geometry }: GeoObject) =>
    geometry?.borderGeocodes && geometry.borderGeocodes !== 'string'
        ? (JSON.parse(geometry.borderGeocodes) as GeometryGeoJSON)
        : null;
