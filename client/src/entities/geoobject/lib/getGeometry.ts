import type { GeoObject, GeometryGeoJSON } from './types';

export const getGeometry = ({ geometry }: GeoObject) =>
    geometry && geometry.borderGeocodes !== 'string' ? (JSON.parse(geometry.borderGeocodes) as GeometryGeoJSON) : null;
