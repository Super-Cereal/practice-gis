import React from 'react';
import { useUnit } from 'effector-react';
import { Circle, Polyline, Polygon } from 'react-leaflet';

import { MapEditorPopup } from '../map-editor-popup/map-editor-popup';

import { getColorOptions } from '../../lib/get-color-options';
import { editorModel } from '../../lib/editor.model';
import { EditorObject } from '../../lib/types';

/** Рендерит геообьекты на карте */
export const MapEditorObjects = () => {
    const objects = useUnit(editorModel.$objects);

    const getProps = ({ _id, type, selected, readonly, coordinates }: EditorObject) => {
        const common: Record<string, any> = {
            key: _id,
            pathOptions: getColorOptions(selected, readonly),
            eventHandlers: {
                click: () => !selected && editorModel.toggleObjectSelect(_id),
            },
        };

        switch (type) {
            case 'Point':
                return { ...common, radius: 16, center: coordinates, Component: Circle };
            case 'PolyLine':
                return { ...common, weight: 7, positions: coordinates, Component: Polyline };
            case 'Polygon':
                return { ...common, positions: coordinates, Component: Polygon };
        }
    };

    return (
        <>
            {Object.values(objects).map((object) => {
                const { Component, ...props } = getProps(object);

                return (
                    // @ts-ignore
                    <Component {...props}>
                        <MapEditorPopup object={object} />
                    </Component>
                );
            })}
        </>
    );
};
