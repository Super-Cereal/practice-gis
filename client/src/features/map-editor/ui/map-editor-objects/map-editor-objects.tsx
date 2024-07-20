import React, { useState } from 'react';
import { useUnit } from 'effector-react';
import { Circle, Polyline, Polygon } from 'react-leaflet';

import { MapEditorPopup } from '../map-editor-popup/map-editor-popup';

import { getColorOptions } from '../../lib/get-color-options';
import { editorModel } from '../../lib/editor.model';
import { EditorObject } from '../../lib/types';

/** Рендерит геообьекты на карте */
export const MapEditorObjects = () => {
    const objects = useUnit(editorModel.$objects);

    return (
        <>
            {Object.values(objects).map((object) => {
                const { Component, ...props } = getProps(object);

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

const getProps = (object: EditorObject) => {
    const { _id, type, selected, readonly, coordinates } = object;

    const common: Record<string, any> = {
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
