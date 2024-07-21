import { get, post, put, del } from '../../../shared/lib/fetch';
import type { GeoObject, DraftGeoObject, ParentChildObjectLink, Classifier, GeoObjectsClassifier } from '../lib/types';

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
export const getClassifiersRequest = async () => {
    const data = await get<Classifier[]>('/api/Classifier');
    return data;
};



export const saveClassifierRequest = async (classifier: Classifier) => {
    try {
        const response = await post<Classifier, Classifier>('/api/Classifier', classifier);
        if (!response) {
            throw new Error(`${classifier.name} could not be added.`);
        }
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addGeoObjectClassifierRequest = async (GeoObjectsClassifier: GeoObjectsClassifier) => {
    try {
        const response = await post<GeoObjectsClassifier, GeoObjectsClassifier>(
            '/api/GeoObject/AddClassifier',
            GeoObjectsClassifier
        );
        if (!response) {
            throw new Error('The relationship could not be added.');
        }
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
