import React from 'react';

import { Button } from '../../../../shared/ui/button';
import styles from './map-editor-actions.module.scss';
import { editorModel } from '../../lib/editor.model';

/** Рендерит список действий в черновиковом режиме (обьединение/удаление кнопок/полигонов) */
export const MapEditorActions = () => {
    return (
        <div className={styles.editor}>
            <h2>Выбранные геообъекты:</h2>

            <div className={styles.btns}>
                <h3>Точки</h3>
                <Button onClick={editorModel.createPolygon}>Обьединить точки в полигон</Button>
                <Button color="orange">Удалить точки</Button>
            </div>

            <div className={styles.btns}>
                <h3>Полигоны</h3>
                <Button>Обьединить полигоны</Button>
                <Button color="orange">Удалить полигоны</Button>
            </div>
        </div>
    );
};
