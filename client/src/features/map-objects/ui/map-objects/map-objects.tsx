import React, { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import { Circle, Polygon, Polyline } from 'react-leaflet';
import { MapObjectPopup } from '../map-object-popup/map-object-popup';
import { aspectsModel, geoObjectModel, getGeometry, type GeoObject, type GeometryGeoJSON } from '../../../../entities/geoobject';
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

    const [filteredGeoobjects, setFilteredGeoobjects] = useState<GeoObject[]>()

    if (selectedAspect) {
        geoObjects = geoObjects.filter((geoObject) => {
            const geoobjectAspectLink = assignedAspects.find(
                ({ geographicalObjectId, code }) =>
                    geoObject.id === geographicalObjectId && selectedAspect.code === code,
            );
            return Boolean(geoobjectAspectLink);
        });
    }

    useEffect(() => {
        if (clippedObject) {
            const preFilteredGeoobjects = geoObjects.filter((geoObject) => {
                geoObject.id !== clippedObject?.id
            });
            setFilteredGeoobjects(preFilteredGeoobjects)
        } else if (!clippedObject) {
            setFilteredGeoobjects(geoObjects)
        }


    }, [clippedObject, geoObjects])



    return (
        <>
            {filteredGeoobjects?.map((object) => {
                const geometry = getGeometry(object);
                if (!geometry) {
                    return null;
                }
                const { Component, ...props } = getProps(object, geometry, selectedObjects, zoomedObject);
                return (
                    // @ts-ignore
                    <Component {...props} key={props.updateKey}>
                        <MapObjectPopup
                            object={object}
                            geometry={geometry}
                            visible={selectedObjects.some((selectedObject) => selectedObject.id === object.id)}
                        /*  zoomed={zoomedObject && zoomedObject.id === object.id} */
                        />
                    </Component>
                );
            })}
        </>
    );
};

const getProps = (object: GeoObject, geometry: GeometryGeoJSON, selectedObjects: GeoObject[], zoomedObject: GeoObject | null) => {
    const { type, coordinates } = geometry;
    const isSelected = selectedObjects.some((selectedObject) => selectedObject.id === object.id);
    const isZoomed = zoomedObject && zoomedObject.id === object.id;
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
        color: isSelected ? 'purple' : 'blue', // Контур
        fillColor: isSelected ? 'purple' : 'blue', // Заполнение
        fillOpacity: 0.2,
        colorOpacity: 0.2,
        zIndexOffset: isZoomed ? 1000 : 0, // Приближенный объект будет наверху
    };
    const updateKey = `${object.id}-${isSelected ? 'selected' : 'unselected'}-${isZoomed ? 'zoomed' : 'unzoomed'}`;

    switch (type) {
        case 'Point':
            return { ...common, radius: 16, center: coordinates, Component: Circle, updateKey };
        case 'PolyLine':
            return { ...common, weight: 3, positions: coordinates, Component: Polyline, updateKey };
        case 'Polygon':
            return { ...common, weight: 3, positions: coordinates, Component: Polygon, updateKey };
    }
};
