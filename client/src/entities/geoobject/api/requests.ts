import { get, post, put, del } from '../../../shared/lib/fetch';
import type { GeoObject, DraftGeoObject, ParentChildObjectLink } from '../lib/types';

export const getGeoObjectsRequest = async () => {
    const data = await get<GeoObject[]>('/api/GeoObject');
    return data;
};

export const getOneGeoObjectRequest = async (id: string) => {
    const data = await get<GeoObject>(`/api/GeoObjects/${id}`);
    return data;
};

// убрала массив GeoObject[]
export const saveGeoObjectRequest = async (object: DraftGeoObject) => {
    const data = await post<GeoObject, DraftGeoObject>('/api/GeoObject', object);
    return data;
};

export const updateGeoObjectRequest = async (object: GeoObject) => {
    const data = await put<GeoObject[], GeoObject>(`/api/GeoObject/${object.id}`, object);
    return data;
};
export const addParentChildLinkRequest = async (parentChildLink: ParentChildObjectLink) => {
    const data = await post<ParentChildObjectLink[], ParentChildObjectLink>('/api/ParentChild/AddParentChildLink', parentChildLink);
    return data;
};

export const deleteGeoObjectRequest = async (id: string) => {
    await del(`/api/GeoObject/${id}`);
    
};