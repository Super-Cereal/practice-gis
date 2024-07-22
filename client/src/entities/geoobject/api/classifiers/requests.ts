import { toast } from 'react-toastify';

import { get, post } from '../../../../shared/lib/fetch';

import type { Classifier, GeoObjectsClassifier, DraftClassifier } from '../../model/classifiers';

export const getClassifiersRequest = async () => {
    const data = await get<Classifier[]>('/api/Classifier');
    return data;
};

export const getGeoObjectClassifiersRequest = async (geoObjectId: string): Promise<string[]> => {
    try {
        const response = await get<{ geoObjectId: string; classifierId: string }[]>(`/api/GOC/GetObjectsClassifiers`);
        if (!response) {
            throw new Error();
        }
        return response.filter((item) => item.geoObjectId === geoObjectId).map((item) => item.classifierId);
    } catch (error) {
        toast('Could not get classifiers for the object.', { type: 'error' });
        console.error(error);
        throw error;
    }
};

export const saveClassifierRequest = async (classifier: DraftClassifier) => {
    try {
        const response = await post<Classifier>('/api/Classifier', { body: classifier });

        if (!response) {
            throw new Error();
        }

        toast('Классификатор создан', { type: 'success' });

        return response;
    } catch (error) {
        toast(`${classifier.name} could not be added.`, { type: 'error' });
        console.error(error);
        throw error;
    }
};

export const addGeoObjectClassifierRequest = async ({ geoObjectId, classifierId }: GeoObjectsClassifier) => {
    try {
        const response = await post<GeoObjectsClassifier>(`/api/GeoObject/AddClassifier`, {
            query: { geoObjectId, classifierId },
        });

        if (!response) {
            throw new Error();
        }

        toast('Обьекту добавлен классификатор', { type: 'success' });

        return response;
    } catch (error) {
        toast('The relationship could not be added.', { type: 'error' });
        console.error(error);
        throw error;
    }
};
