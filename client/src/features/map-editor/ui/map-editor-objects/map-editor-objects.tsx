import React from 'react';
import { useUnit } from 'effector-react';
import { Circle, Polyline, Polygon } from 'react-leaflet';

import { selectedOptions, defaultOptions } from '../../lib/constants';
import { editorModel } from '../../lib/editor.model';
import { MapEditorPopupForm } from '../map-editor-popup-form/map-editor-popup-form';

/** Рендерит геообьекты на карте */
export const MapEditorObjects = () => {
    const $points = useUnit(editorModel.$points);
    const $lines = useUnit(editorModel.$lines);
    const $polygons = useUnit(editorModel.$polygons);

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

            {Object.values($lines).map(({ _id, coordinates, selected }) => (
                <Polyline
                    weight={7}
                    key={_id}
                    positions={coordinates}
                    pathOptions={selected ? selectedOptions : defaultOptions}
                    eventHandlers={{
                        click: () => editorModel.toggleLineSelect(_id),
                        mouseover: (e) => e.target.openPopup(),
                    }}
                >
                    <MapEditorPopupForm _id={_id} type="PolyLine" onDelete={() => editorModel.deleteLine(_id)} />
                </Polyline>
            ))}

            {Object.values($polygons).map(({ _id, coordinates, selected }) => (
                <Polygon
                    key={_id}
                    positions={coordinates}
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
