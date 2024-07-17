import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { Circle, Polyline, Polygon } from 'react-leaflet';
import type { LeafletMouseEvent } from 'leaflet';

import { mapModel } from '../../../../entities/map';

import { selectedOptions, defaultOptions } from '../../lib/constants';
import { editorModel } from '../../lib/editor.model';
import { MapEditorPopupForm } from '../map-editor-popup-form/map-editor-popup-form';

/** Рендерит геообьекты на карте */
export const MapEditorObjects = () => {
    const $map = useUnit(mapModel.$map);

    const $points = useUnit(editorModel.$points);
    const $lines = useUnit(editorModel.$lines);
    const $polygons = useUnit(editorModel.$polygons);

    useEffect(() => {
        if (!$map) {
            return;
        }

        const handleMapClick = (e: LeafletMouseEvent) => {
            editorModel.addPoint([e.latlng.lat, e.latlng.lng]);
        };

        $map.addEventListener('click', handleMapClick);

        return () => {
            $map.removeEventListener('click', handleMapClick);
        };
    }, [$map]);

    return (
        <>
            {Object.values($points).map(({ _id, coordinates, selected }) => (
                <Circle
                    key={_id}
                    center={coordinates}
                    pathOptions={selected ? selectedOptions : defaultOptions}
                    radius={20}
                    eventHandlers={{
                        click: () => editorModel.togglePointSelect(_id),
                        mouseover: (e) => e.target.openPopup(),
                    }}
                >
                    <MapEditorPopupForm _id={_id} type="Point" onDelete={() => editorModel.deletePoint(_id)} />
                </Circle>
            ))}

            {Object.values($lines).map(({ _id, points, selected }) => (
                <Polyline
                    weight={7}
                    key={_id}
                    positions={points.map(({ coordinates }) => coordinates)}
                    pathOptions={selected ? selectedOptions : defaultOptions}
                    eventHandlers={{
                        click: () => editorModel.toggleLineSelect(_id),
                        mouseover: (e) => e.target.openPopup(),
                    }}
                >
                    <MapEditorPopupForm _id={_id} type="PolyLine" onDelete={() => editorModel.deleteLine(_id)} />
                </Polyline>
            ))}

            {Object.values($polygons).map(({ _id, points, selected }) => (
                <Polygon
                    key={_id}
                    positions={points.map(({ coordinates }) => coordinates)}
                    pathOptions={selected ? selectedOptions : defaultOptions}
                    eventHandlers={{
                        click: () => editorModel.togglePolygonSelect(_id),
                        mouseover: (e) => e.target.openPopup(),
                    }}
                >
                    <MapEditorPopupForm
                        _id={_id}
                        type="Polygon"
                        /* polygonId={id} */ onDelete={() => editorModel.deletePolygon(_id)}
                    />
                </Polygon>
            ))}
        </>
    );
};
