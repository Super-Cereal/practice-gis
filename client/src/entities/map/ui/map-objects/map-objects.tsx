import React from 'react';
import { useUnit } from 'effector-react';
import { Circle, Polygon, Polyline } from 'react-leaflet';

import { MapEditorPopupForm, mapEditorModel } from '../../../../features/map-editor';
import { geoObjectModel } from '../../../geoobject';

export const MapObjects = () => {
    const geoObjects = useUnit(geoObjectModel.$geoObjects);

    debugger;

    return (
        <>
            {geoObjects.map((geoObject) => {
                switch (geoObject.type) {
                    case 'point':
                        return (
                            'coordinates' in geoObject.geometryObject && (
                                <Circle
                                    key={geoObject.id}
                                    center={geoObject.geometryObject.coordinates}
                                    //   pathOptions={geoObject.selected ? selectedOptions : defaultOptions}
                                    radius={20}
                                    eventHandlers={{
                                        click: () => mapEditorModel.togglePointSelect(geoObject.id),
                                        mouseover: (e) => e.target.openPopup(),
                                    }}
                                >
                                    <MapEditorPopupForm
                                        id={geoObject.id}
                                        type="point"
                                        onDelete={() => mapEditorModel.deletePoint(geoObject.id)}
                                    />
                                </Circle>
                            )
                        );
                    case 'line':
                        return (
                            'points' in geoObject.geometryObject && (
                                <Polyline
                                    weight={7}
                                    key={geoObject.id}
                                    positions={geoObject.geometryObject.points.map(({ coordinates }) => coordinates)}
                                    //   pathOptions={geoObject.selected ? selectedOptions : defaultOptions}
                                    eventHandlers={{
                                        click: () => mapEditorModel.toggleLineSelect(geoObject.id),
                                        mouseover: (e) => e.target.openPopup(),
                                    }}
                                >
                                    <MapEditorPopupForm
                                        id={geoObject.id}
                                        type="line"
                                        onDelete={() => mapEditorModel.deleteLine(geoObject.id)}
                                    />
                                </Polyline>
                            )
                        );
                    case 'polygon':
                        return (
                            'points' in geoObject.geometryObject && (
                                <Polygon
                                    key={geoObject.id}
                                    positions={geoObject.geometryObject.points.map(({ coordinates }) => coordinates)}
                                    //   pathOptions={geoObject.selected ? selectedOptions : defaultOptions}
                                    eventHandlers={{
                                        click: () => mapEditorModel.togglePolygonSelect(geoObject.id),
                                        mouseover: (e) => e.target.openPopup(),
                                    }}
                                >
                                    <MapEditorPopupForm
                                        id={geoObject.id}
                                        type="polygon"
                                        onDelete={() => mapEditorModel.deletePolygon(geoObject.id)}
                                    />
                                </Polygon>
                            )
                        );
                }
            })}
        </>
    );
};
