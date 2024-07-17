import React from 'react';
import { Popup } from 'react-leaflet';
import { useUnit } from 'effector-react';

import { Button } from '../../../../shared/ui/button';
import { mapModel } from '../../../../entities/map';
import { geoObjectFormModel } from '../../../geoobject-form/';

import type { EditorObjectType } from '../../lib/types';

import styles from './map-editor-popup-form.module.css';

interface Props {
    _id: string;
    type: EditorObjectType;
    onDelete: () => void;
}

/** Рендерит универсальную форму в попапе для черновиковых обьектов на карте */
export const MapEditorPopupForm = ({ onDelete, type, _id }: Props) => {
    const selectedAspect = useUnit(mapModel.$mapAspect);

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete();
    };

    const handleModalFormOpen = () => {
        geoObjectFormModel.setSelectedEditorObject({ _id, type });
        geoObjectFormModel.setIsGeoObjectModalOpen(true);
    };

    const handleModalAspectsOpen = () => {
        geoObjectFormModel.setSelectedEditorObject({ _id, type });
        geoObjectFormModel.setIsAspectsModalOpen(true);
    };

    return (
        <Popup>
            <h3>
                {type} : {_id}
            </h3>

            <div className={styles.btns}>
                <Button onClick={handleModalFormOpen}>Создать геообъект</Button>

                <Button onClick={handleDelete} color="orange">
                    Удалить
                </Button>
            </div>
        </Popup>
    );
};
