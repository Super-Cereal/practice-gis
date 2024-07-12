import { useEffect } from 'react';
import { Circle, Popup } from 'react-leaflet';
import type { LeafletMouseEvent, PathOptions } from 'leaflet';
import { useUnit } from 'effector-react';

import { Button } from '../../../../shared/ui/button';
import { mapModel } from '../../../../entities/map';

import { editorModel } from '../../lib/editor.model';

import styles from './map-editor-points.module.css';

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
                // если нужно что-то делать с точкой, которая в полигоне, например запретить удалять
                // const usedInPolygon = Object.values($polygons).some(({ points }) =>
                //     points.some(({ id }) => id === point.id),
                // );

                const handleDelete = (e: React.MouseEvent) => {
                    e.stopPropagation();

                    editorModel.deletePoint(id);
                };

                return (
                    <Circle
                        key={index}
                        center={coordinates}
                        pathOptions={selected ? selectedOptions : defaultOptions}
                        radius={20}
                        eventHandlers={{
                            click: () => editorModel.togglePointSelect(id),
                            mouseover: (e) => e.target.openPopup(),
                        }}
                    >
                        <Popup>
                            <h3>Точка {id}</h3>

                            <div className={styles.btns}>
                                <Button onClick={handleDelete} color="orange">
                                    Удалить
                                </Button>
                            </div>
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
