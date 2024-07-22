import { toast } from 'react-toastify';

import { get, post } from '../../../../shared/lib/fetch';

import type { Classifier, GeoObjectsClassifier, DraftClassifier } from '../../model/classifiers';

export const getClassifiersRequest = async () => {
    const data = await get<Classifier[]>('/api/Classifier');
    return data;
};

export const saveClassifierRequest = async (classifier: DraftClassifier) => {
    try {
        const response = await post<Classifier>('/api/Classifier', { body: classifier });
        if (!response) {
            throw new Error();
        }
        return response;
    } catch (error) {
        toast(`${classifier.name} could not be added.`, { type: 'error' });
        console.error(error);
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
        return response;
    } catch (error) {
        toast('The relationship could not be added.', { type: 'error' });
        console.error(error);
    }
};
