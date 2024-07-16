import { get, post, patch } from '../../../shared/lib/fetch';
import { GeoObject } from '../lib/types';

export const getGeoObjectsRequest = async () => {
    const data = await get<GeoObject[]>('/api/GeoObjects');
    return data
};
export const getOneGeoObjectRequest = async (id: string) => {
    const data = await get<GeoObject>(`/api/GeoObjects/${id}`);
    return data;
};
export const saveGeoObjectRequest = async (object: GeoObject) => {
    const data = await post<GeoObject[], GeoObject>('/api/GeoObject', object);
    return data
   
};

export const updateGeoObjectRequest = async (object: GeoObject) => {
    const data = await patch<GeoObject[], GeoObject>('/api/GeoObject', object);
    return data
};
