import React from 'react';
import { useUnit } from 'effector-react';
import { Circle, Polygon, Polyline } from 'react-leaflet';

import { MapObjectPopup } from '../map-object-popup/map-object-popup';
import { geoObjectModel, getGeometry, type GeoObject, type GeometryGeoJSON } from '../../../../entities/geoobject';

import { mapObjectsModel } from '../../lib/map-objects.model';
import { infoPlateModel } from '../../../info-plate/lib';

export const MapObjects = () => {
    const geoObjects = useUnit(geoObjectModel.$geoObjects);
    const selectedObject = useUnit(mapObjectsModel.$selectedGeoobject);

    const showArchiveObjects = useUnit(infoPlateModel.$showArchiveObjects);
    const filteredGeoObjects = showArchiveObjects ? geoObjects : geoObjects.filter(obj => obj.status !== 100);

    return (
        <>
            {filteredGeoObjects.map((object) => {
                const geometry = getGeometry(object);

                if (!geometry) {
                    return null;
                }

                const { Component, ...props } = getProps(object, geometry);

                return (
                    // @ts-ignore
                    <Component {...props} key={object.id}>
                        <MapObjectPopup
                            object={object}
                            geometry={geometry}
                            visible={selectedObject?.id === object.id}
                        />
                    </Component>
                );
            })}
        </>
    );
};

const getProps = (object: GeoObject, geometry: GeometryGeoJSON) => {
    const { type, coordinates } = geometry;

    const common: Record<string, any> = {
        eventHandlers: {
            click: () => {
                mapObjectsModel.setSelectedGeoobject(object);
                // И из-за того, что при повторном клике на обьект попап
                // сперва закрывается, затем открывается, у нас пропадает контент
                // Этот таймаут это лечит
                setTimeout(() => {
                    mapObjectsModel.setSelectedGeoobject(object);
                }, 200);
                // Попап из react-leaflet плохой
                // Из-за того что он не анмаунтится приходится писать костыли
            },
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
