import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import L, { LatLngTuple } from 'leaflet';
import { mapModel } from '../../entities/map';
import type { GeoObject } from '../../entities/geoobject';
import { getGeometry } from '../../entities/geoobject';

type ClippingOverlayProps = {
    clippedObject: GeoObject | null;
};

export const ClippingOverlay: React.FC<ClippingOverlayProps> = ({ clippedObject }) => {
    const map = useUnit(mapModel.$map);
    const isClippingMode = useUnit(mapModel.$isClippingMode);

    useEffect(() => {
        if (!isClippingMode || !clippedObject || !map) return;

        const geometry = getGeometry(clippedObject);
        if (!geometry || !Array.isArray(geometry.coordinates)) return;

        // Определяем координаты объекта
        const objectCoordinates = geometry.coordinates as LatLngTuple[];

        // Создаем "маску" - огромный прямоугольник, охватывающий весь мир
        const worldPolygon: LatLngTuple[] = [
            [-90, -180],
            [-90, 180],
            [90, 180],
            [90, -180],
            [-90, -180],
        ];

        // Используем полигон, который вырезает внутреннюю часть выбранного объекта
        const clippingLayer = L.polygon([worldPolygon, objectCoordinates], {
            color: 'black',
            fillOpacity: 0.4,
            /*     stroke: false, // Без обводки */
        });

        // Добавляем слой на карту
        clippingLayer.addTo(map);

        // Удаляем слой при размонтировании
        return () => {
            map.removeLayer(clippingLayer);
        };
    }, [isClippingMode, clippedObject, map]);

    return null;
};
