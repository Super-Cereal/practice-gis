import type { GeoObject, GeometryGeoJSON } from './types';

export const getGeometry = ({ geometry }: GeoObject) =>
    geometry ? (JSON.parse(geometry.borderGeocodes) as GeometryGeoJSON) : null;
