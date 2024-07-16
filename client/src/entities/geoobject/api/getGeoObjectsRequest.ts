import { get } from '../../../shared/lib/fetch';
import { GeoObject } from '../lib/types';

export const getGeoObjectsRequest = async () => {
    return get<GeoObject[]>('/api/GeoObjects');
};
