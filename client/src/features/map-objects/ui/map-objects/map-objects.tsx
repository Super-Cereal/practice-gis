import React from 'react';
import { useUnit } from 'effector-react';
import { Circle, Polygon, Polyline } from 'react-leaflet';

import { MapObjectPopup } from '../map-object-popup/map-object-popup';
import { type GeoObject, geoObjectModel, getGeometry } from '../../../../entities/geoobject';

export const MapObjects = () => {
    const geoObjects = useUnit(geoObjectModel.$geoObjects);

    return (
        <>
            {geoObjects.map((object) => (
                <MapObject object={object} key={object.id} />
            ))}
        </>
    );
};

const MapObject = ({ object }: { object: GeoObject }) => {
    const geometry = getGeometry(object);

    if (!geometry) {
        return null;
    }

    const { type: geometryType, coordinates } = geometry;

    if (geometryType === 'Point') {
        return (
            <Circle center={coordinates} radius={20}>
                <MapObjectPopup onDelete={() => {}} object={object} type={geometryType} />
            </Circle>
        );
    }

    if (geometryType === 'PolyLine') {
        return (
            <Polyline weight={7} positions={coordinates}>
                <MapObjectPopup onDelete={() => {}} object={object} type={geometryType} />
            </Polyline>
        );
    }

    if (geometryType === 'Polygon') {
        return (
            <Polygon positions={coordinates}>
                <MapObjectPopup onDelete={() => {}} object={object} type={geometryType} />
            </Polygon>
        );
    }

    return null;
};
