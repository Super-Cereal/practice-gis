import React from 'react';
import { Popup } from 'react-leaflet';
import { useUnit } from 'effector-react';

import { Button } from '../../../../shared/ui/button';
import { mapModel } from '../../../../entities/map';
import { GeoObject } from '../../../../entities/geoobject';

import { EditorObjectType } from '../../../map-editor';
import { geoObjectFormModel } from '../../../geoobject-form';

import styles from './map-object-popup.module.css';

interface Props {
    onDelete: () => void;
    object: GeoObject;
    type: EditorObjectType;
}

/** Рендерит попап для сохраненных обьектов на карте */
export const MapObjectPopup = ({ onDelete, object, type }: Props) => {
    const { id } = object;

    const selectedAspect = useUnit(mapModel.$mapAspect);

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete();
    };

    const handleModalFormOpen = () => {
        geoObjectFormModel.setSelectedGeoObject(object);
        geoObjectFormModel.setIsGeoObjectModalOpen(true);
    };

    const handleModalAspectsOpen = () => {
        geoObjectFormModel.setSelectedGeoObject(object);
        geoObjectFormModel.setIsAspectsModalOpen(true);
    };

    return (
        <Popup>
            <h3>
                {type} : {id}
            </h3>

            <div className={styles.btns}>
                {selectedAspect ? (
                    <Button /* onClick={handleModalFormOpen} */>Создать {selectedAspect.title} для геообъекта</Button>
                ) : (
                    <>
                        <Button /* onClick={handleModalFormOpen} */>Изменить родительский геообъект</Button>
                        <Button /* onClick={handleModalFormOpen} */>Создать дочерний геообъект</Button>
                    </>
                )}

                {/*    {isObjectExists && (
                    <Button onClick={handleModalAspectsOpen}>Просмотр аспектов на данной геометрии</Button>
                )} */}

                {/* <Button onClick={handleDelete} color="orange">
                    Удалить
                </Button> */}
            </div>
        </Popup>
    );
};
