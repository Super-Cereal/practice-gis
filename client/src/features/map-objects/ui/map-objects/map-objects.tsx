import React from 'react';
import { useUnit } from 'effector-react';
import { Circle, Polygon, Polyline } from 'react-leaflet';

import { type GeoObject, geoObjectModel, getGeometry } from '../../../../entities/geoobject';
import { MapObjectPopup } from '../map-object-popup/map-object-popup';

import { mapObjectsModel } from '../../lib/map-objects.model';

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

    const events = {
        click: () => mapObjectsModel.setSelectedGeoobject(object),
        popupclose: () => mapObjectsModel.setSelectedGeoobject(null),
    };

    const { type: geometryType, coordinates } = geometry;

    if (geometryType === 'Point') {
        return (
            <Circle eventHandlers={events} center={coordinates} radius={20}>
                <MapObjectPopup onDelete={() => {}} object={object} type={geometryType} />
            </Circle>
        );
    }

    if (geometryType === 'PolyLine') {
        return (
            <Polyline eventHandlers={events} positions={coordinates} weight={7}>
                <MapObjectPopup onDelete={() => {}} object={object} type={geometryType} />
            </Polyline>
        );
    }

    if (geometryType === 'Polygon') {
        return (
            <Polygon eventHandlers={events} positions={coordinates}>
                <MapObjectPopup onDelete={() => {}} object={object} type={geometryType} />
            </Polygon>
        );
    }

    return null;
};
