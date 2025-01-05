import React, { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import { Circle, Polygon, Polyline, useMap } from 'react-leaflet';
import { MapObjectPopup } from '../map-object-popup/map-object-popup';
import {
    aspectsModel,
    geoObjectModel,
    getGeometry,
    topologyModel,
    type GeoObject,
    type GeometryGeoJSON,
} from '../../../../entities/geoobject';
import { mapObjectsModel } from '../../lib/map-objects.model';
import { mapModel } from '../../../../entities/map';
import { editorModel } from '../../../map-editor/lib/editor.model';

export const MapObjects = () => {
    let geoObjects = useUnit(geoObjectModel.$geoObjects);
    const selectedObjects = useUnit(mapObjectsModel.$selectedGeoobjects);
    const selectedAspect = useUnit(mapModel.$mapAspect);
    const assignedAspects = useUnit(aspectsModel.$assignedAspects);
    const zoomedObject = useUnit(mapObjectsModel.$zoomedObject);

    const clippedObject = useUnit(editorModel.$clippedObject);

    const [filteredGeoobjects, setFilteredGeoobjects] = useState<GeoObject[]>();
    const parentChildLinks = useUnit(topologyModel.$parentChildLinks);

    // Состояние для масштаба
    const [zoom, setZoom] = useState<number>(12);
    const map = useMap();

    useEffect(() => {
        if (clippedObject) {
            const childGeoObjects = parentChildLinks
                .filter((link) => link.parentGeographicalObjectId === clippedObject.id)
                .map((link) => link.childGeographicalObjectId)
                .flatMap((id) => geoObjects.find((item) => item.id === id))
                .filter((geoObject): geoObject is GeoObject => geoObject !== undefined);

            const preFilteredGeoobjects = geoObjects.filter((geoObject) => geoObject.id !== clippedObject?.id);
            preFilteredGeoobjects.push(...childGeoObjects);
            setFilteredGeoobjects(preFilteredGeoobjects);
        } else if (!clippedObject) {
            setFilteredGeoobjects(geoObjects);
        }
    }, [clippedObject, geoObjects]);

    // Слушатель изменения масштаба
    useEffect(() => {
        const handleZoom = () => {
            const currentZoom = map.getZoom();
            setZoom(currentZoom);
            console.log('currentZoom', currentZoom);
        };

        map.on('zoomend', handleZoom);
        return () => {
            map.off('zoomend', handleZoom);
        };
    }, [map]);

    return (
        <>
            {filteredGeoobjects?.map((object) => {
                const geometry = getGeometry(object);
                if (!geometry) {
                    return null;
                }
                const { Component, ...props } = getProps(object, geometry, selectedObjects, zoomedObject, zoom);
                return (
                    // @ts-ignore
                    <Component {...props} key={props.updateKey}>
                        <MapObjectPopup
                            object={object}
                            geometry={geometry}
                            visible={selectedObjects.some((selectedObject) => selectedObject.id === object.id)}
                        />
                    </Component>
                );
            })}
        </>
    );
};

const getProps = (
    object: GeoObject,
    geometry: GeometryGeoJSON,
    selectedObjects: GeoObject[],
    zoomedObject: GeoObject | null,
    zoom: number,
) => {
    const { type, coordinates } = geometry;
    const isSelected = selectedObjects.some((selectedObject) => selectedObject.id === object.id);
    const isZoomed = zoomedObject && zoomedObject.id === object.id;

    // Размеры объектов зависят от уровня зума
    const sizeMultiplier = Math.max(1, zoom / 12);

    let sizeMultiplierForRadius = 18;

    if (zoom >= 16) {
        sizeMultiplierForRadius = zoom;
    } else if (zoom > 11 && zoom < 16) {
        sizeMultiplierForRadius = zoom / 3;
    } else if (zoom <= 11) {
        sizeMultiplierForRadius = zoom / 20;
    }

    const radius = 100 / sizeMultiplierForRadius; // Радиус точек

    const weight = 2 * sizeMultiplier; // Толщина линий
    const common: Record<string, any> = {
        eventHandlers: {
            click: () => {
                const currentSelectedObjects = mapObjectsModel.$selectedGeoobjects.getState();
                if (currentSelectedObjects.some((selectedObject) => selectedObject.id === object.id)) {
                    mapObjectsModel.removeSelectedGeoobject(object);
                } else {
                    mapObjectsModel.addSelectedGeoobject(object);
                }
            },
        },
        color: isSelected ? 'purple' : 'blue',
        fillColor: isSelected ? 'purple' : 'blue',
        fillOpacity: 0.4,
        zIndexOffset: isZoomed ? 1000 : 0,
    };
    const updateKey = `${object.id}-${isSelected ? 'selected' : 'unselected'}-${isZoomed ? 'zoomed' : 'unzoomed'}`;

    switch (type) {
        case 'Point':
            return { ...common, radius, center: coordinates, Component: Circle, updateKey };
        case 'PolyLine':
            return { ...common, weight, positions: coordinates, Component: Polyline, updateKey };
        case 'Polygon':
            return { ...common, weight, positions: coordinates, Component: Polygon, updateKey };
    }
};
