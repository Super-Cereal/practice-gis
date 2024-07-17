import React from 'react';
import { useUnit } from 'effector-react';

import { Button } from '../../../../shared/ui/button';
import styles from './map-editor-actions.module.scss';
import { editorModel } from '../../lib/editor.model';
import { EditorObjectType } from '../../lib/types';

/** Рендерит список действий в черновиковом режиме (обьединение/удаление кнопок/полигонов) */
export const MapEditorActions = () => {
    const selectedPoints = useUnit(editorModel.$selectedPoints);
    const selectedLines = useUnit(editorModel.$selectedLines);
    const selectedPolygons = useUnit(editorModel.$selectedPolygons);

    const typeToSettings = {
        Point: {
            list: selectedPoints,
            onDelete: editorModel.deletePoint,
            onToggleSelect: editorModel.togglePointSelect,
        },
        PolyLine: {
            list: selectedLines,
            onDelete: editorModel.deleteLine,
            onToggleSelect: editorModel.toggleLineSelect,
        },
        Polygon: {
            list: selectedPolygons,
            onDelete: editorModel.deletePolygon,
            onToggleSelect: editorModel.togglePolygonSelect,
        },
    };

    const deleteObjects = (objectType: EditorObjectType) => {
        const { list, onDelete } = typeToSettings[objectType];
        list.map(({ _id }) => onDelete(_id));
    };

    const removeObjectsSelection = (objectType: EditorObjectType) => {
        const { list, onToggleSelect } = typeToSettings[objectType];
        list.map(({ _id }) => onToggleSelect(_id));
    };

    return (
        <div className={styles.editor}>
            <h2>Выбранные геообъекты:</h2>

            {selectedPoints.length !== 0 && (
                <div className={styles.container}>
                    <h3>Точки ({selectedPoints.length})</h3>

                    <div>
                        {selectedPoints.map(({ _id, coordinates }) => (
                            <div key={_id}>id: {_id}</div>
                        ))}
                    </div>

                    {selectedPoints.length > 1 && (
                        <Button onClick={() => editorModel.createLine()}>Обьединить в линию</Button>
                    )}
                    {selectedPoints.length > 2 && (
                        <Button onClick={() => editorModel.createPolygon()}>Обьединить в полигон</Button>
                    )}

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
                        {selectedLines.map(({ _id, points }) => (
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
                        {selectedPolygons.map(({ _id, points }) => (
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
