import type { DraftGeoObject } from '../../../entities/geoobject';

export interface FormFields {
    name: string;
    aspect: string;
    description: string;
    classCode: string;
    status: DraftGeoObject['status'];
}
