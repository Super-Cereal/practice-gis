import React from 'react';
import { Popup } from 'react-leaflet';

import { Button } from '../../../../shared/ui/button';

import styles from './map-editor-popup-form.module.css';

interface Props {
    title: string;

    onDelete: () => void;
}

/** Рендерит универсальную форму в попапе для геообьектов на карте */
export const MapEditorPopupForm = ({ title, onDelete }: Props) => {
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();

        onDelete();
    };

    return (
        <Popup>
            <h3>{title}</h3>

            <div className={styles.btns}>
                <Button onClick={handleDelete} color="orange">
                    Удалить
                </Button>
            </div>
        </Popup>
    );
};
