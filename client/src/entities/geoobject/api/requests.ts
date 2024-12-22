import { toast } from 'react-toastify';
import { get, post, put, del } from '../../../shared/lib/fetch';
import type { GeoObject, DraftGeoObject, GeometryGeoJSON, PolygonsRequestDTO } from '../model/types';

export const getGeoObjectsRequest = async () => {
    const data = await get<GeoObject[]>('/api/GeoObject');
    return data;
};

export const saveGeoObjectRequest = async (object: DraftGeoObject) => {
    try {
        const data = await post<GeoObject>('/api/GeoObject', { body: object });
        toast('Обьект создан', { type: 'success' });
        return data;
    } catch (e) {
        toast('Что-то пошло не так', { type: 'error' });
        console.log(e);
        throw e;
    }
};

export const updateGeoObjectRequest = async (object: GeoObject) => {
    try {
        const data = await put<GeoObject[]>(`/api/GeoObject/${object.id}`, { body: object });
        toast('Обьект обновлен', { type: 'success' });
        return data;
    } catch (e) {
        toast('Что-то пошло не так', { type: 'error' });
        console.log(e);
        throw e;
    }
};

export const deleteGeoObjectRequest = async (id: string) => {
    try {
        await del(`/api/GeoObject/${id}`);
        toast('Обьект удален', { type: 'success' });
    } catch (e) {
        toast('Что-то пошло не так', { type: 'error' });
        console.log(e);
        throw e;
    }
};

export const unionPolygonsRequest = async (request: PolygonsRequestDTO) => {
    try {
        const data = await post('/api/GeoObject/UnionPolygons', { body: request });
        toast('Полигоны успешно объединены', { type: 'success' });
        return data;
    } catch (e) {
        toast('Ошибка при объединении полигонов', { type: 'error' });
        console.log(e);
        throw e;
    }
};

export const intersectPolygonsRequest = async (request: PolygonsRequestDTO) => {
    try {
        const data = await post('/api/GeoObject/IntersectPolygons', { body: request });
        toast('Полигоны успешно пересечены', { type: 'success' });
        return data;
    } catch (e) {
        toast('Ошибка при пересечении полигонов', { type: 'error' });
        console.log(e);
        throw e;
    }
};
