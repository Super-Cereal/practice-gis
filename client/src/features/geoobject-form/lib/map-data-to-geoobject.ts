import { DraftGeoObject } from '../../../entities/geoobject';
import { EditorObject } from '../../map-editor';

import { getClassifierCodeWithType } from './classifiers';
import { mockedGeoNames } from './geoNames';
import type { FormFields } from './types';


export const getgeoNamesFeatureCode = (geoNamesFeatureCode: string) => {
    return mockedGeoNames.find((cl) => cl.geoNamesFeatureCode === geoNamesFeatureCode);
};


export const mapDataToGeoobject = (
    { name, aspect, status, classCode, description, geoNamesFeatureCode }: FormFields,
    { type, coordinates }: EditorObject,
): DraftGeoObject => {

    const geoCodeObj = getgeoNamesFeatureCode(geoNamesFeatureCode);
    return {
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
            

        },
        //с геокодами при отправке дает ошибку
   /*      geoNameFeature: {
            id: geoCodeObj?.id,
            FeatureKindNameRu: geoCodeObj?.featureNameEn,
            commentsEn: geoCodeObj?.commentsEn,
            geoNamesFeatureCode: geoCodeObj?.geoNamesFeatureCode,
        }
           */  
              
           
    }




};
