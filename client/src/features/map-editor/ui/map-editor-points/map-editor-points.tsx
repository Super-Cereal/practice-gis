import { useEffect } from 'react';
import { Circle, Popup } from 'react-leaflet';
import type { LeafletMouseEvent, PathOptions } from 'leaflet';
import { useUnit } from 'effector-react';

import { editorModel } from '../../lib/editor.model';
import { mapModel } from '../../../../entities/map';

/** Рендерит черновиковые кнопки и обрабатывает их создание, выделение и сохранение */
export const MapEditorPoints = () => {
    const $map = useUnit(mapModel.$map);
    const $points = useUnit(editorModel.$points);

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
            {Object.values($points).map(({ id, coordinates, selected }, index) => {
                // const usedInPolygon = Object.values($polygons).some(({ points }) =>
                //     points.some(({ id }) => id === point.id),
                // );

                return (
                    <Circle
                        key={index}
                        center={coordinates}
                        pathOptions={selected ? selectedOptions : defaultOptions}
                        radius={20}
                        eventHandlers={{ click: () => editorModel.togglePointSelect(id) }}
                    >
                        <Popup>
                            <h3>Точка {id}</h3>
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
