import React from 'react';
import { useUnit } from 'effector-react';

import { Button } from '../../../../shared/ui/button';
import styles from './map-editor-actions.module.scss';
import { editorModel } from '../../lib/editor.model';

/** Рендерит список действий в черновиковом режиме (обьединение/удаление кнопок/полигонов) */
export const MapEditorActions = () => {
    const selectedPoints = Object.values(useUnit(editorModel.$points)).filter(({ selected }) => selected);
    const selectedPolygons = Object.values(useUnit(editorModel.$polygons)).filter(({ selected }) => selected);

    const handleRemoveSelectedPoints = () => {
        selectedPoints.forEach(({ id }) => editorModel.togglePointSelect(id));
    };
    const handleCreatePolygon = () => {
        editorModel.createPolygon();
    };
    const handleDeleteSelectedPoints = () => {
        selectedPoints.forEach(({ id }) => editorModel.deletePoint(id));
    };

    const handleRemoveSelectedPolygons = () => {
        selectedPolygons.forEach(({ id }) => editorModel.togglePolygonSelect(id));
    };
    const handleDeleteSelectedPolygons = () => {
        selectedPolygons.forEach(({ id }) => editorModel.deletePolygon(id));
    };

    return (
        <div className={styles.editor}>
            <h2>Выбранные геообъекты:</h2>

            {selectedPoints.length !== 0 && (
                <div className={styles.container}>
                    <h3>Точки ({selectedPoints.length})</h3>

                    <div>
                        {selectedPoints.map(({ id, coordinates }) => (
                            <div>id: {id}</div>
                        ))}
                    </div>
                    <Button onClick={handleRemoveSelectedPoints}>Снять выделение</Button>
                    {selectedPoints.length > 2 && <Button onClick={handleCreatePolygon}>Обьединить в полигон</Button>}
                    <Button onClick={handleDeleteSelectedPoints} color="orange">
                        Удалить
                    </Button>
                </div>
            )}

            {selectedPolygons.length !== 0 && (
                <div className={styles.container}>
                    <h3>Полигоны ({selectedPolygons.length})</h3>
                    <div>
                        {selectedPolygons.map(({ id, points }) => (
                            <div>id: {id}</div>
                        ))}
                    </div>
                    <Button onClick={handleRemoveSelectedPolygons}>Снять выделение</Button>
                    <Button onClick={handleDeleteSelectedPolygons} color="orange">
                        Удалить
                    </Button>
                </div>
            )}
        </div>
    );
};
