import { get, post, put } from '../../../shared/lib/fetch';
import { GeoObject } from '../lib/types';

export const getGeoObjectsRequest = async () => {
    const data = await get<GeoObject[]>('/api/GeoObject');
    return data
};

export const saveGeoObjectRequest = async (object: GeoObject) => {
    const data = await post<GeoObject[], GeoObject>('/api/GeoObject', object);
    return data
   
};

export const updateGeoObjectRequest = async (object: GeoObject) => {
    const data = await put<GeoObject[], GeoObject>(`/api/GeoObject/${object.id}`, object);
    return data
};
