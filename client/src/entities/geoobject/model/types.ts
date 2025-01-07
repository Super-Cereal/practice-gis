import type { LatLngTuple } from 'leaflet';
import type { Classifier } from './classifiers';
import type { GEO_OBJECT_STATUS } from './constants';

export interface parentGeoObjects {
    id: string;
    childGeographicalObjectId: string;
    parentGeographicalObjectId: string;
}

export interface GeoObject extends DraftGeoObject {
    id: string;
    /*     parentGeoObjects: parentGeoObjects[]; */
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

export type GeometryGeoJSON =
    | {
          type: 'Point';
          coordinates: LatLngTuple;
      }
    | {
          type: 'PolyLine' | 'Polygon';
          coordinates: LatLngTuple[];
      };

export interface PolygonsRequestDTO {
    Polygon1: GeometryGeoJSONPolygon;
    Polygon2: GeometryGeoJSONPolygon;
}

export type GeometryGeoJSONPolygon = {
    type: 'Polygon';
    coordinates: LatLngTuple[][];
};

export type FeatureCollection = {
    type: 'FeatureCollection';
    features: Feature[];
    properties: Record<string, any>;
};

export type Feature = {
    type: 'Feature';
    geometry: GeometryGeoJSONPolygon;
    properties: Record<string, any>;
};

export const convertPolygonsToFeatureCollection = (
    polygon1: GeometryGeoJSONPolygon,
    polygon2: GeometryGeoJSONPolygon,
): FeatureCollection => {
    const features: Feature[] = [
        {
            type: 'Feature',
            geometry: polygon1,
            properties: {},
        },
        {
            type: 'Feature',
            geometry: polygon2,
            properties: {},
        },
    ];

    return {
        type: 'FeatureCollection',
        features: features,
        properties: {},
    };
};
