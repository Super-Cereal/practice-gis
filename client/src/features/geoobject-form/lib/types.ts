import type { DraftGeoObject } from '../../../entities/geoobject';

export interface FormFields {
    name: string;
    aspect: string;
    description: string;
    classCode: string;
    geoNamesFeatureCode: string; 
    status: DraftGeoObject['status'];
}

export interface FormFieldsForClassifier {
    name: string;
    code: string;
    commonInfo: string;
}
