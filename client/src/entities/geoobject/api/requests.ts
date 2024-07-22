import { get, post, put, del } from '../../../shared/lib/fetch';
import type { GeoObject, DraftGeoObject } from '../model/types';

export const getGeoObjectsRequest = async () => {
    const data = await get<GeoObject[]>('/api/GeoObject');
    return data;
};

export const saveGeoObjectRequest = async (object: DraftGeoObject) => {
    const data = await post<GeoObject>('/api/GeoObject', { body: object });
    return data;
};

export const updateGeoObjectRequest = async (object: GeoObject) => {
    const data = await put<GeoObject[]>(`/api/GeoObject/${object.id}`, { body: object });
    return data;
};

export const deleteGeoObjectRequest = async (id: string) => {
    del(`/api/GeoObject/${id}`);
};
