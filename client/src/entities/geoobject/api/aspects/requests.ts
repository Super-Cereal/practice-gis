import { toast } from 'react-toastify';

import { get, post } from '../../../../shared/lib/fetch';

import type { AssignedAspect, DraftAspect } from '../../model/aspects';

export const getAspectsRequest = async () => {
    const data = await get<AssignedAspect[]>('/api/Aspect');
    return data;
};

export const createAspectRequest = async (aspect: DraftAspect) => {
    try {
        const response = await post<{ aspectDTO: AssignedAspect }>('/api/Aspect', { body: aspect });

        if (!response) {
            throw new Error();
        }

        toast(`Аспект создан`, { type: 'success' });

        return response;
    } catch (error) {
        toast(`Не получилось создать аспект ${aspect.type}`, { type: 'error' });
        console.error(error);
    }
};

export const assignAspectRequest = async (aspect: Omit<AssignedAspect, 'id'>) => {
    try {
        const response = await post<{ aspectDTO: AssignedAspect }>('/api/Aspect', { body: aspect });

        if (!response) {
            throw new Error();
        }

        toast(`Обьекту добавлен аспект`, { type: 'success' });

        return response;
    } catch (error) {
        toast(`Не получилось назначить обьекту аспект ${aspect.type}`, { type: 'error' });
        console.error(error);
    }
};
