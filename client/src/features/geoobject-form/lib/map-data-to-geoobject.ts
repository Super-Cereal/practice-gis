import { DraftGeoObject } from '../../../entities/geoobject';
import { EditorObject } from '../../map-editor';

import { getClassifierCodeWithType } from './classifiers';
import type { FormFields } from './types';
import { mockedClassifiers } from './classifiers';

export const getClass = (classCode: string) => {
    return mockedClassifiers.find((cl) => cl.code === classCode);
  };


export const mapDataToGeoobject = (
    { name, aspect, status, classCode, description }: FormFields,
    { type, coordinates }: EditorObject,
): DraftGeoObject => ({
    name,
    // status,
    geometry: {
        authoritativeKnowledgeSource: 'источник/автор',

        borderGeocodes: JSON.stringify({ type, coordinates }),

        areaValue: 0,
        westToEastLength: 0,
        northToSouthLength: 0,
    },
    geoObjectInfo: {
        language: 'Russian',
        commonInfo: description,
        // классифаер нельзя закинуть сразу при создании объекта
        
    },
});
