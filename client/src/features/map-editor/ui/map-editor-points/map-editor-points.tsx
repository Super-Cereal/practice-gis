import { useEffect } from 'react';
import { Circle, Popup } from 'react-leaflet';
import { LeafletMouseEvent, PathOptions } from 'leaflet';
import { useUnit } from 'effector-react';
import { nanoid } from 'nanoid';

import { editorModel } from '../../lib/editor.model';
import { mapModel } from '../../../../entities/map';
import type { Point } from '../../lib/types';

export const MapEditorPoints = () => {
    const $map = useUnit(mapModel.$map);
    const $points = useUnit(editorModel.$points);

    useEffect(() => {
        if (!$map) {
            return;
        }

        const handleMapClick = (e: LeafletMouseEvent) => {
            editorModel.addPoint({ id: nanoid(), coordinates: [e.latlng.lat, e.latlng.lng], selected: true });
        };

        $map.addEventListener('click', handleMapClick);

        return () => {
            $map.removeEventListener('click', handleMapClick);
        };
    }, [$map]);

    const handlePointClick = (e: LeafletMouseEvent) => {};

    return (
        <>
            {Object.values($points).map((point, index) => {
                // const usedInPolygon = $polygons.some(({ points }) => points.some(({ id }) => id === point.id));

                return (
                    <Circle
                        key={index}
                        center={point.coordinates}
                        pathOptions={point.selected ? selectedOptions : defaultOptions}
                        radius={20}
                        eventHandlers={{ click: () => editorModel.togglePointSelect(point.id) }}
                    >
                        <Popup>
                            <h3>Точка {point.id}</h3>
                        </Popup>
                    </Circle>
                );
            })}
        </>
    );
};

const defaultOptions: PathOptions = {
    fillColor: 'gray',
    color: 'gray',
};
const selectedOptions: PathOptions = {
    fillColor: 'green',
    color: 'green',
};
