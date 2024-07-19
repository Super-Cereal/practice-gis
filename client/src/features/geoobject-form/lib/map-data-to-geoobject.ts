import { DraftGeoObject } from '../../../entities/geoobject';
import { EditorObject } from '../../map-editor';

import { getClassifierCodeWithType } from './classifiers';
import type { FormFields } from './types';

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
        // классифаер на данный момент сперва надо создать
        classifiers: [
            {
                code: getClassifierCodeWithType(type, classCode),
            },
        ],
    },
});
