import React from 'react';

import { Copy as CopyIcon } from 'react-bootstrap-icons';

import styles from './map-object-id-with-copy.module.css';

/** Рендерит айдишник геообьекта с кнопкой "копировать" */
export const MapObjectIdWithCopy = ({ id }: { id: string }) => {
    const handleCopyId = () => {
        navigator.clipboard.writeText(id);
    };

    return (
        <div className={styles.id}>
            <span>id: {id.slice(0, 10)}...</span>
            <CopyIcon className={styles.copy} onClick={handleCopyId} />
        </div>
    );
};
