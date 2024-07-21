import type { LatLngTuple } from 'leaflet';
import type { GEO_OBJECT_STATUS } from './constants';

export interface GeoObject extends DraftGeoObject {
    id: string;
}

export interface DraftGeoObject {
    /** Любое имя */
    name: string;

    /** Статус обьекта */
    status?: (typeof GEO_OBJECT_STATUS)[keyof typeof GEO_OBJECT_STATUS];

    /** Предлагаю это не использовать в пользу geoObjectInfo */
    geoNameFeature?: GeoNameFeature;

    geometry: Geometry;

    geoObjectInfo?: GeoObjectInfo;
}

interface GeoNameFeature {
    id?: string;
    /** гео код*/
    geoNamesFeatureCode?: string;
    /** Любой комментарий */
    commentsEn?: string;
    /** название кода */
    FeatureKindNameRu?: string;
}

interface Geometry {
    /** ?Авторитетный источник инфы? */
    authoritativeKnowledgeSource?: string;

    /** Geojson geometry */
    borderGeocodes: string;

    westToEastLength?: number;
    northToSouthLength?: number;

    areaValue?: number;
}

interface GeoObjectInfo {
    /** Код языка */
    languageCode?: string;

    /** Название языка */
    language?: string;

    /** Всякая доп инфа */
    commonInfo?: string;

    classifiers?: Classifier[];
}

export interface Classifier extends DraftClassifier {

    id?: string;

}

export interface DraftClassifier {

    /** Имя классификатора */
    name?: string;

    /** Код классификатора */
    code?: string;

    /** О чем этот классификатор */
    commonInfo?: string;
}

export interface GeoObjectsClassifier {

    geoObjectId?: string;

    classifierId?: string;
}


export interface ParentChildObjectLink {
    ParentGeoObjectId: string;
    ChildGeoObjectId: string;

}
export type GeometryGeoJSON =
    | {
        type: 'Point';
        coordinates: LatLngTuple;
    }
    | {
        type: 'PolyLine' | 'Polygon';
        coordinates: LatLngTuple[];
    };
