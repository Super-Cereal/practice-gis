import React from 'react';
import { Popup } from 'react-leaflet';

import { Button } from '../../../../shared/ui/button';

import { geoObjectFormModel } from '../../../geoobject-form/';
import { editorModal } from '../../lib/editor-modal.model';

import styles from './map-editor-popup-form.module.css';
import { useUnit } from 'effector-react';
import { mapModel } from '../../../../entities/map';
import { geoObjectModel } from '../../../../entities/geoobject/lib/geoobject.model';

interface Props {
    type: string;
    onDelete: () => void;
    id: string;
}

/** Рендерит универсальную форму в попапе для геообьектов на карте */
export const MapEditorPopupForm = ({ onDelete, type, id }: Props) => {
    const selectAspect = useUnit(mapModel.$mapAspect);
    const geoObjects = useUnit(geoObjectModel.$geoObjects);

    const isObjectExists = !!geoObjects.find((obj) => obj.geometryObject._id === id);

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete();
    };

    const handleModalFormOpen = () => {
        geoObjectFormModel.setSelectedObjectEvent({ type, id });
        editorModal.setIsGeoObjectModalOpenTrue();
    };

    const handleModalAspectsOpen = () => {
        geoObjectFormModel.setSelectedObjectEvent({ type, id });
        editorModal.setIsAspectsModalOpenTrue();
    };

    return (
        <Popup>
            <h3>
                {type} : {id}
            </h3>

            <div className={styles.btns}>
                {selectAspect != null ?

                    //аспект выбран
                    //создание geoinfo для cуществующего геообъекта
                    <>
                        {isObjectExists ?
                           //объект существует
                            <Button /* onClick={handleModalFormOpen} */>Создать {selectAspect.title} для геообъекта</Button>
                            :
                            //объект не существует
                            <h3>родительский объект отсутствует</h3>
                        }

                    </>
                    :
                    //аспект не выбран
                    <>
                        {isObjectExists ?
                        //объект существует
                            <>
                                <Button /* onClick={handleModalFormOpen} */>Изменить родительский геообъект</Button>
                                <Button /* onClick={handleModalFormOpen} */>Создать дочерний геообъект</Button>

                            </>
                            :
                         //объект не существует
                            <Button onClick={handleModalFormOpen}>Создать родительский геообъект</Button>
                        }
                    </>

                }

                {/*    {isObjectExists && (
                    <Button onClick={handleModalAspectsOpen}>Просмотр аспектов на данной геометрии</Button>
                )} */}

                <Button onClick={handleDelete} color="orange">
                    Удалить
                </Button>
            </div>
        </Popup>
    );
};