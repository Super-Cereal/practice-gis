import { DraftGeoObject } from '../../../entities/geoobject';

import { getClassifierCodeWithType } from './classifiers';
import type { FormFields, PreparedEditorObject } from './types';

export const mapDataToGeoobject = (
    { name, aspect, status, classCode, description }: FormFields,
    editorObject: PreparedEditorObject,
): DraftGeoObject => ({
    name,
    // status,
    geometry: {
        authoritativeKnowledgeSource: 'источник/автор',

        borderGeocodes: JSON.stringify({
            type: editorObject.type,
            coordinates: editorObject.object.coordinates,
        }),

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
                code: getClassifierCodeWithType(editorObject.type, classCode),
            },
        ],
    },
});
