import React from 'react';
import { Popup } from 'react-leaflet';

import { Button } from '../../../../shared/ui/button';

import styles from './map-editor-popup-form.module.css';
import { editorModal } from '../../lib/editor-modal.model';
import { geoObjectModel } from '../../../../entities/geoobject/lib/geoobject.model';

interface Props {
    type: string;
    onDelete: () => void;
    id: string;
}

/** Рендерит универсальную форму в попапе для геообьектов на карте */
export const MapEditorPopupForm = ({ onDelete, type, id }: Props) => {
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete();
    };

    const handleModalOpen = () => {
        geoObjectModel.setSelectedObjectEvent({ type, id });
        editorModal.setIsGeoObjectModalOpenTrue();
    };

    return (
        <Popup>
            <h3>
                {type} : {id}
            </h3>

            <div className={styles.btns}>
                <Button onClick={handleModalOpen}>Создать геообъект</Button>
                <Button onClick={handleDelete} color="orange">
                    Удалить
                </Button>
            </div>
        </Popup>
    );
};
