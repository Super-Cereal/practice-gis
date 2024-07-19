import React, { useRef } from 'react';
import { Popup } from 'react-leaflet';
import { useUnit } from 'effector-react';

import { Button } from '../../../../shared/ui/button';
import { mapModel } from '../../../../entities/map';
import { geoObjectFormModel } from '../../../geoobject-form';

import type { EditorObjectType } from '../../lib/types';

import styles from './map-editor-popup.module.css';

interface Props {
    _id: string;
    type: EditorObjectType;
    onDelete: () => void;
    onRemoveSelect: () => void;
}

/** Рендерит попап для черновиковых обьектов на карте */
export const MapEditorPopup = (props: Props) => (
    <Popup>
        <Content {...props} />
    </Popup>
);

/** Выделяем отдельно, чтобы не рендерить, пока попап скрыт */
const Content = ({ onDelete, onRemoveSelect, type, _id }: Props) => {
    const map = useUnit(mapModel.$map);

    const handleRemoveSelect = (e: React.MouseEvent) => {
        e.stopPropagation();

        map?.closePopup();
        onRemoveSelect();
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete();
    };

    const handleModalFormOpen = () => {
        geoObjectFormModel.setSelectedEditorObject({ _id, type });
        geoObjectFormModel.setIsGeoObjectModalOpen(true);
    };

    // const selectedAspect = useUnit(mapModel.$mapAspect);
    // const handleModalAspectsOpen = () => {
    //     geoObjectFormModel.setSelectedEditorObject({ _id, type });
    //     geoObjectFormModel.setIsAspectsModalOpen(true);
    // };
    return (
        <>
            <h3>
                {type} : {_id}
            </h3>

            <div className={styles.btns}>
                <Button onClick={handleModalFormOpen}>Создать геообъект</Button>

                <Button onClick={handleRemoveSelect}>Снять выделение</Button>
                <Button onClick={handleDelete} color="orange">
                    Удалить
                </Button>
            </div>
        </>
    );
};
