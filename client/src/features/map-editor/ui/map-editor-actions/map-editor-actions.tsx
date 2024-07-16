import React from 'react';
import { useUnit } from 'effector-react';

import { Button } from '../../../../shared/ui/button';
import styles from './map-editor-actions.module.scss';
import { editorModel } from '../../lib/editor.model';
import { editorModal } from '../../lib/editor-modal.model';
import { GeoobjectForm } from '../../../geoobject-form';
import { GeoaspectsList } from '../../../geoaspects-list';

/** Рендерит список действий в черновиковом режиме (обьединение/удаление кнопок/полигонов) */
export const MapEditorActions = () => {
    const selectedPoints = useUnit(editorModel.$selectedPoints);
    const selectedLines = useUnit(editorModel.$selectedLines);
    const selectedPolygons = useUnit(editorModel.$selectedPolygons);
    const isModalFormOpen = useUnit(editorModal.$isGeoObjectModalOpen);
    const isModalAspectsOpen = useUnit(editorModal.$isAspectsModalOpen);

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
                    <Button onClick={() => editorModel.removePointsSelection()}>Снять выделение</Button>
                    {selectedPoints.length > 1 && (
                        <Button onClick={() => editorModel.createLine()}>Обьединить в линию</Button>
                    )}
                    {selectedPoints.length > 2 && (
                        <Button onClick={() => editorModel.createPolygon()}>Обьединить в полигон</Button>
                    )}
                    <Button onClick={() => editorModel.deleteSelectedPoints()} color="orange">
                        Удалить
                    </Button>
                </div>
            )}

            {selectedLines.length !== 0 && (
                <div className={styles.container}>
                    <h3>Линии ({selectedLines.length})</h3>

                    <div>
                        {selectedLines.map(({ id, points }) => (
                            <div>id: {id}</div>
                        ))}
                    </div>
                    <Button onClick={() => editorModel.removeLinesSelection()}>Снять выделение</Button>
                    <Button onClick={() => editorModel.deleteSelectedLines()} color="orange">
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
                    <Button onClick={() => editorModel.removePolygonSelection()}>Снять выделение</Button>

                    <Button onClick={() => editorModel.deleteSelectedPolygons()} color="orange">
                        Удалить
                    </Button>
                </div>
            )}

            {isModalFormOpen && <GeoobjectForm />}
            {isModalAspectsOpen && <GeoaspectsList />}
        </div>
    );
};
