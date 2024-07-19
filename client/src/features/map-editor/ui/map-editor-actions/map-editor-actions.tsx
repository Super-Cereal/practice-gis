import React, { useEffect } from 'react';
import { LeafletMouseEvent } from 'leaflet';
import { useUnit } from 'effector-react';

import { Button } from '../../../../shared/ui/button';
import { mapModel } from '../../../../entities/map';

import { editorModel } from '../../lib/editor.model';
import { EditorObjectType } from '../../lib/types';

import styles from './map-editor-actions.module.scss';

/** Рендерит список действий в черновиковом режиме (обьединение/удаление кнопок/полигонов) */
export const MapEditorActions = () => {
    const map = useUnit(mapModel.$map);

    useEffect(() => {
        if (!map) {
            return;
        }

        const handleMapClick = (e: LeafletMouseEvent) => {
            editorModel.addPoint([e.latlng.lat, e.latlng.lng]);
        };

        map.addEventListener('click', handleMapClick);

        return () => {
            map.removeEventListener('click', handleMapClick);
        };
    }, [map]);

    const selectedPoints = useUnit(editorModel.$selectedPoints);
    const selectedLines = useUnit(editorModel.$selectedLines);
    const selectedPolygons = useUnit(editorModel.$selectedPolygons);

    const typeToSettings = {
        Point: {
            list: selectedPoints,
            onDelete: editorModel.deletePoint,
            onRemoveSelect: editorModel.togglePointSelect,
        },
        PolyLine: {
            list: selectedLines,
            onDelete: editorModel.deleteLine,
            onRemoveSelect: editorModel.toggleLineSelect,
        },
        Polygon: {
            list: selectedPolygons,
            onDelete: editorModel.deletePolygon,
            onRemoveSelect: editorModel.togglePolygonSelect,
        },
    };

    const deleteObjects = (objectType: EditorObjectType) => {
        map?.closePopup();

        const { list, onDelete } = typeToSettings[objectType];
        list.map(({ _id }) => onDelete(_id));
    };

    const removeObjectsSelection = (objectType: EditorObjectType) => {
        map?.closePopup();

        const { list, onRemoveSelect } = typeToSettings[objectType];
        list.map(({ _id }) => onRemoveSelect(_id));
    };

    const uniteToPolyline = () => {
        map?.closePopup();

        editorModel.createLine();
    };

    const uniteToPolygon = () => {
        map?.closePopup();

        editorModel.createPolygon();
    };

    return (
        <div>
            <h2>Выбранные геообъекты:</h2>

            {selectedPoints.length !== 0 && (
                <div className={styles.container}>
                    <h3>Точки ({selectedPoints.length})</h3>

                    <div>
                        {selectedPoints.map(({ _id, coordinates }) => (
                            <div key={_id}>id: {_id}</div>
                        ))}
                    </div>

                    {selectedPoints.length > 1 && <Button onClick={uniteToPolyline}>Обьединить в линию</Button>}
                    {selectedPoints.length > 2 && <Button onClick={uniteToPolygon}>Обьединить в полигон</Button>}

                    <Button onClick={() => removeObjectsSelection('Point')}>Снять выделение</Button>
                    <Button onClick={() => deleteObjects('Point')} color="orange">
                        Удалить
                    </Button>
                </div>
            )}

            {selectedLines.length !== 0 && (
                <div className={styles.container}>
                    <h3>Линии ({selectedLines.length})</h3>

                    <div>
                        {selectedLines.map(({ _id }) => (
                            <div key={_id}>id: {_id}</div>
                        ))}
                    </div>

                    <Button onClick={() => removeObjectsSelection('PolyLine')}>Снять выделение</Button>
                    <Button onClick={() => deleteObjects('PolyLine')} color="orange">
                        Удалить
                    </Button>
                </div>
            )}

            {selectedPolygons.length !== 0 && (
                <div className={styles.container}>
                    <h3>Полигоны ({selectedPolygons.length})</h3>

                    <div>
                        {selectedPolygons.map(({ _id }) => (
                            <div key={_id}>id: {_id}</div>
                        ))}
                    </div>

                    <Button onClick={() => removeObjectsSelection('Polygon')}>Снять выделение</Button>
                    <Button onClick={() => deleteObjects('Polygon')} color="orange">
                        Удалить
                    </Button>
                </div>
            )}
        </div>
    );
};
