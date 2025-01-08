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

export interface FeatureCollectionRequestDTO {
    FeatureCollection: FeatureCollection;
}

export type GeometryJSONPolygon = {
    type: string;
    coordinates: number[][][] | number[][] | number[];
};
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
    polygons: GeometryGeoJSONPolygon[],
    scalar: number = 1000000,
): FeatureCollection => {
    // Функция для переворота координат (широта, долгота -> долгота, широта)
    const reverseLatLng = (coordinates: LatLngTuple[][]): LatLngTuple[][] => {
        if (!coordinates || coordinates.length === 0) {
            throw new Error('Invalid coordinates provided.');
        }

        return coordinates.map((ring) =>
            ring.map(([lat, lng]) => {
                // Преобразуем lat и lng в числа, если они представлены как строки или другой тип
                const numericLat = parseFloat(lat as any); // Преобразуем lat в число
                const numericLng = parseFloat(lng as any); // Преобразуем lng в число

                // Проверяем, что они действительно стали числами
                if (isNaN(numericLat) || isNaN(numericLng)) {
                    throw new Error(`Invalid coordinate pair: [${lat}, ${lng}]`);
                }

                console.log(numericLat * scalar); // Проверка, что работает умножение

                // Сначала умножаем на scalar, потом округляем
                const scaledLat = parseFloat((numericLat * scalar).toFixed(6));
                const scaledLng = parseFloat((numericLng * scalar).toFixed(6));

                return [scaledLng, scaledLat]; // Переворачиваем координаты (широта, долгота -> долгота, широта)
            }),
        );
    };

    // Переводим каждую точку полигона, применяя scalar и переворачиваем координаты
    const features: Feature[] = polygons.map((polygon) => ({
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: reverseLatLng(polygon.coordinates),
        },
        properties: {},
    }));

    return {
        type: 'FeatureCollection',
        features: features,
        properties: {},
    };
};
