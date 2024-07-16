import { get, post, patch } from '../../../shared/lib/fetch';
import { GeoObject } from '../lib/types';

export const getGeoObjectsRequest = async () => {
    return get<GeoObject[]>('/api/GeoObjects');
};

export const saveGeoObjectRequest = async (object: GeoObject) => {
    return post<GeoObject[], GeoObject>('/api/GeoObject', object);
};

export const updateGeoObjectRequest = async (object: GeoObject) => {
    return patch<GeoObject[], GeoObject>('/api/GeoObject', object);
};
