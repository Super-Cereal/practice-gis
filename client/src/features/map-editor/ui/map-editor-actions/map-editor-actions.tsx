import React from 'react';

import { Button } from '../../../../shared/ui/button';
import styles from './map-editor-actions.module.scss';

export const MapEditorActions = () => {
    return (
        <div className={styles.editor}>
            <h2>Выбранные геообъекты:</h2>

            <div className={styles.btns}>
                <h3>Точки</h3>
                <Button>Обьединить точки</Button>
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
