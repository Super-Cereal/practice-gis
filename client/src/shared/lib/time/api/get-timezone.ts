import { post } from '../../fetch';

import type { Timezone } from '../lib/timezone.model';

export interface GetTimezoneRequestParams {
    anyId: string;
    lat: number;
    long: number;
}

export const getTimezoneRequest = async ({ anyId, lat, long }: GetTimezoneRequestParams) => {
    const { timezone } = await post<{ timezone: Timezone[] }, Omit<GetTimezoneRequestParams, 'anyId'>>(
        '/api/find-timezone',
        { lat, long },
        { domain: 'http://localhost:4000' },
    );

    return { [anyId]: timezone[0] };
};
