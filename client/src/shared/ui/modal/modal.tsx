import React, { type PropsWithChildren } from 'react';

import styles from './modal.module.css';

interface Props extends PropsWithChildren {
    onClose?: () => void;
}

export const Modal = ({ children, onClose }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.overlay} onClick={onClose} />

            <div className={styles.content}>{children}</div>
        </div>
    );
};
