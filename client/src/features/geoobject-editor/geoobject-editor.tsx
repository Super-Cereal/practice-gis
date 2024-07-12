import React from 'react';

import styles from './geoobject-editor.module.css';

/** Редактор выбранного/сохраняемого геообьекта (код, название, описание, статус, тд) */
export const GeoobjectEditor = () => {
    return (
        <div className={styles.editor}>
            <h2>Выберите геообъект, чтобы увидеть справку</h2>
        </div>
    );
};
