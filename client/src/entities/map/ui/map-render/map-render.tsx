import React, { useEffect, useState } from 'react'
import { getGeoObjectsRequest } from '../../../geoobject/api/requests'
import { GeoObject } from '../../../geoobject';
import { Circle, Polygon, Polyline } from 'react-leaflet';
import { MapEditorPopupForm } from '../../../../features/map-editor/ui/map-editor-popup-form/map-editor-popup-form';
import { editorModel } from '../../../../features/map-editor/lib/editor.model';
import { useUnit } from 'effector-react';

export const MapRender = () => {
    const [geoObjects, setGeoObjects] = useState<GeoObject[]>([]);


//fetching
    /*   useEffect(() => {
          const fetchGeoObjects = async () => {
              const response = await getGeoObjectsRequest();
              setGeoObjects(response);
          };
          fetchGeoObjects();
      }, []); */


    return (
        <>
            {geoObjects.map((geoObject) => {
                switch (geoObject.type) {
                    case 'point':
                        if ('coordinates' in geoObject.geometryObject)

                            return (
                                <Circle
                                    key={geoObject.id}
                                    center={geoObject.geometryObject.coordinates}
                                    //   pathOptions={geoObject.selected ? selectedOptions : defaultOptions}
                                    radius={20}
                                    eventHandlers={{
                                        click: () => editorModel.togglePointSelect(geoObject.id),
                                        mouseover: (e) => e.target.openPopup(),
                                    }}
                                >
                                    <MapEditorPopupForm id={geoObject.id} type='point' onDelete={() => editorModel.deletePoint(geoObject.id)} />
                                </Circle>
                            );
                        break;
                    case 'line':
                        if ('points' in geoObject.geometryObject)

                            return (
                                <Polyline
                                    weight={7}
                                    key={geoObject.id}
                                    positions={geoObject.geometryObject.points.map(({ coordinates }) => coordinates)}
                                    //   pathOptions={geoObject.selected ? selectedOptions : defaultOptions}
                                    eventHandlers={{
                                        click: () => editorModel.toggleLineSelect(geoObject.id),
                                        mouseover: (e) => e.target.openPopup(),
                                    }}
                                >
                                    <MapEditorPopupForm id={geoObject.id} type='line' onDelete={() => editorModel.deleteLine(geoObject.id)} />
                                </Polyline>
                            );
                        break;
                    case 'polygon':
                        if ('points' in geoObject.geometryObject)

                            return (
                                <Polygon
                                    key={geoObject.id}
                                    positions={geoObject.geometryObject.points.map(({ coordinates }) => coordinates)}
                                    //   pathOptions={geoObject.selected ? selectedOptions : defaultOptions}
                                    eventHandlers={{
                                        click: () => editorModel.togglePolygonSelect(geoObject.id),
                                        mouseover: (e) => e.target.openPopup(),
                                    }}
                                >
                                    <MapEditorPopupForm id={geoObject.id} type='polygon' onDelete={() => editorModel.deletePolygon(geoObject.id)} />
                                </Polygon>
                            );
                        break;
                    default:
                        return null;
                }
            })}
        </>
    )
}
