import { Polygon, Popup } from 'react-leaflet';
import type { PathOptions } from 'leaflet';
import { useUnit } from 'effector-react';

import { Button } from '../../../../shared/ui/button';

import { editorModel } from '../../lib/editor.model';

import styles from './map-editor-polygons.module.css';

/** Рендерит черновиковые полигоны и обрабатывает их создание, выделение и сохранение */
export const MapEditorPolygons = () => {
    const $polygons = useUnit(editorModel.$polygons);

    return (
        <>
            {Object.values($polygons).map(({ id, points, selected }, index) => {
                const handleDelete = (e: React.MouseEvent) => {
                    e.stopPropagation();

                    editorModel.deletePolygon(id);
                };

                return (
                    <Polygon
                        key={index}
                        positions={points.map(({ coordinates }) => coordinates)}
                        pathOptions={selected ? selectedOptions : defaultOptions}
                        eventHandlers={{
                            click: () => editorModel.togglePolygonSelect(id),
                            mouseover: (e) => e.target.openPopup(),
                        }}
                    >
                        <Popup>
                            <h3>Полигон {id}</h3>

                            <div className={styles.btns}>
                                <Button onClick={handleDelete} color="orange">
                                    Удалить
                                </Button>
                            </div>
                        </Popup>
                    </Polygon>
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
