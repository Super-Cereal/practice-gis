import { toast } from 'react-toastify';
import { get, post, put, del } from '../../../shared/lib/fetch';
import type {
    GeoObject,
    DraftGeoObject,
    GeometryGeoJSON,
    FeatureCollectionRequestDTO,
    FeatureCollection,
    Feature,
} from '../model/types';

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

export const unionPolygonsRequest = async (request: FeatureCollectionRequestDTO): Promise<Feature> => {
    try {
        const data: Feature = await post('/union', { body: request });
        toast('Полигоны успешно объединены', { type: 'success' });

        if (data.geometry.coordinates.length == 0) {
            toast('Ошибка при объединении полигонов', { type: 'error' });
        }
        return data;
    } catch (e) {
        toast('Ошибка при объединении полигонов', { type: 'error' });
        console.log(e);
        throw e;
    }
};

export const intersectPolygonsRequest = async (request: FeatureCollectionRequestDTO): Promise<Feature> => {
    try {
        const data: Feature = await post('/intersect', { body: request });
        toast('Полигоны успешно пересечены', { type: 'success' });
        if (data.geometry.coordinates.length == 0) {
            toast('Ошибка при объединении полигонов', { type: 'error' });
        }
        return data;
    } catch (e) {
        toast('Ошибка при пересечении полигонов', { type: 'error' });
        console.log(e);
        throw e;
    }
};
