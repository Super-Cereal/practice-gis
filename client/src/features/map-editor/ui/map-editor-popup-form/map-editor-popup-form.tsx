import React from 'react';
import { Popup } from 'react-leaflet';

import { Button } from '../../../../shared/ui/button';

import styles from './map-editor-popup-form.module.css';
import { editorModal } from '../../lib/editor-modal.model';

interface Props {
    title: string;
   // polygonId: number
   type: string;
    onDelete: () => void;
}

/** Рендерит универсальную форму в попапе для геообьектов на карте */
export const MapEditorPopupForm = ({ title, onDelete, type}: Props) => {
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();

        onDelete();
    };

    return (
        <Popup>
            <h3>{title}</h3>

            <Button onClick={() => editorModal.setIsGeoObjectModalOpenTrue()} >
                        Создать геообъект
            </Button>
        </Popup>
    );
};
