import React from 'react';
import { useUnit } from 'effector-react';
import { Circle, Polyline, Polygon } from 'react-leaflet';

import { MapEditorPopup } from '../map-editor-popup/map-editor-popup';

import { selectedOptions, defaultOptions } from '../../lib/constants';
import { editorModel } from '../../lib/editor.model';
import { EditorObject } from '../../lib/types';

/** Рендерит геообьекты на карте */
export const MapEditorObjects = () => {
    const objects = useUnit(editorModel.$objects);

    const getProps = ({ _id, type, selected, coordinates }: EditorObject) => {
        const common: Record<string, any> = {
            key: _id,
            pathOptions: selected ? selectedOptions : defaultOptions,
            eventHandlers: {
                click: () => !selected && editorModel.toggleObjectSelect(_id),
            },
        };

        switch (type) {
            case 'Point':
                return { ...common, radius: 20, center: coordinates, Component: Circle };
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
