import { toast } from 'react-toastify';

import { post } from '../../../../shared/lib/fetch';
import type { ParentChildObjectLink } from '../../model/types';

export const addParentChildLinkRequest = async (parentChildLink: ParentChildObjectLink) => {
    const data = await post<ParentChildObjectLink[]>('/api/ParentChild/AddParentChildLink', { body: parentChildLink });
    return data;
};

export const addTopologyRequest = async (params: {
    geographicalObjectInId: string;
    geographicalObjectOutId: string;
}) => {
    try {
        const data = await post<ParentChildObjectLink[]>('/api/Topology', { body: params });

        return data;
    } catch (error) {
        toast(`Не получилось добавить связь, проверьте введенные id`, { type: 'error' });
        console.error(error);
    }
};
