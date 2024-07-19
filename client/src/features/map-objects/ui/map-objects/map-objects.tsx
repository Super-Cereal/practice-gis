import React from 'react';
import { useUnit } from 'effector-react';
import { Circle, Polygon, Polyline } from 'react-leaflet';

import { type GeoObject, geoObjectModel, getGeometry, GeometryGeoJSON } from '../../../../entities/geoobject';
import { MapObjectPopup } from '../map-object-popup/map-object-popup';

import { mapObjectsModel } from '../../lib/map-objects.model';

export const MapObjects = () => {
    const geoObjects = useUnit(geoObjectModel.$geoObjects);

    const getProps = (object: GeoObject, { type, coordinates }: GeometryGeoJSON) => {
        const common: Record<string, any> = {
            key: object.id,
            eventHandlers: {
                click: () => mapObjectsModel.setSelectedGeoobject(object),
                popupclose: () => mapObjectsModel.setSelectedGeoobject(null),
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
            {geoObjects.map((object) => {
                const geometry = getGeometry(object);

                if (!geometry) {
                    return null;
                }

                const { Component, ...props } = getProps(object, geometry);

                return (
                    // @ts-ignore
                    <Component {...props}>
                        <MapObjectPopup onDelete={() => {}} object={object} type={geometry.type} />
                    </Component>
                );
            })}
        </>
    );
};
