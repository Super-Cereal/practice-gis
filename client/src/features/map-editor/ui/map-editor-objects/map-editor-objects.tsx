import React from 'react';
import { useUnit } from 'effector-react';
import { Circle, Polyline, Polygon } from 'react-leaflet';
import { MapEditorPopup } from '../map-editor-popup/map-editor-popup';
import { getColorOptions } from '../../lib/get-color-options';
import { editorModel } from '../../lib/editor.model';
import { EditorObject } from '../../lib/types';
import { mapModel } from '../../../../entities/map';
import { DraftGeoObject, getGeometry } from '../../../../entities/geoobject';
import { isInsidePolygon } from '../../../../utils/IsPolygonInside';
import { LatLngTuple } from 'leaflet';

/** Рендерит геообьекты на карте */
export const MapEditorObjects = () => {
    const isClippingMode = useUnit(mapModel.$isClippingMode);

    const currentObject = useUnit(editorModel.$clippedObject); // Хранит текущий полигон

    const objects = Object.values(useUnit(editorModel.$objects)).filter((obj: EditorObject) => {
        if (!isClippingMode || !currentObject) return true;

        const currentObjectGeometry = getGeometry(currentObject)?.coordinates;
        if (!currentObjectGeometry) return true;

        return isInsidePolygon(obj.coordinates, currentObjectGeometry as LatLngTuple[]);
    });

    return (
        <>
            {objects.map((object) => {
                const { Component, ...props } = getProps(object);

                if (!Component) return null; // Если компонент не определен, пропускаем объект

                return (
                    // @ts-ignore
                    <Component {...props} key={object._id}>
                        <MapEditorPopup object={object} />
                    </Component>
                );
            })}
        </>
    );
};


/**
 * Функция для получения свойств компонента на основе типа объекта
 */
const getProps = (object: EditorObject) => {
    const { _id, type, selected, readonly, coordinates } = object;

    const common = {
        pathOptions: getColorOptions(selected, readonly),
        eventHandlers: {
            click: () => !selected && editorModel.toggleObjectSelect(_id),
        },
    };

    switch (type) {
        case 'Point':
            return {
                ...common,
                radius: 16,
                center: coordinates as LatLngTuple,
                Component: Circle,
            };
        case 'PolyLine':
            return {
                ...common,
                weight: 3,
                positions: coordinates as LatLngTuple[],
                Component: Polyline,
            };
        case 'Polygon':
            return {
                ...common,
                weight: 3,
                positions: coordinates as LatLngTuple[],
                Component: Polygon,
            };

    }
};
