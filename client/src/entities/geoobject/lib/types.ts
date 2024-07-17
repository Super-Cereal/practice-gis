export interface GeoObject extends DraftGeoObject {
    id: string;
}

export interface DraftGeoObject {
    /** Любое имя */
    name: string;

    /** Статус обьекта */
    status: 'actual' | 'expired';

    /** Предлагаю это не использовать в пользу geoObjectInfo */
    geoNameFeature?: GeoNameFeature;

    geometry: Geometry;

    geoObjectInfo?: GeoObjectInfo;

    geoClassifiers?: Classifier[];
}

interface GeoNameFeature {
    /** Любой комментарий */
    commentsRu?: string;
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
}

export interface Classifier {
    /** Имя классификатора */
    name?: string;

    /** Код классификатора */
    code: number;

    /** О чем этот классификатор */
    commonInfo?: string;
}

export type GeometryGeoJSON =
    | {
          type: 'Point';
          coordinates: [number, number];
      }
    | {
          type: 'PolyLine' | 'Polygon';
          coordinates: [number, number][];
      };
