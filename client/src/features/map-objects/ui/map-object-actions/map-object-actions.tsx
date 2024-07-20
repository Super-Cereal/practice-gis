import React from 'react';
import { useUnit } from 'effector-react';

import { Button } from '../../../../shared/ui/button';
import { mapObjectsModel } from '../../lib/map-objects.model';
import { mapModel } from '../../../../entities/map';

import styles from './map-object-actions.module.css';
import { getGeometry } from '../../../../entities/geoobject';
import { MapObjectIdWithCopy } from '../map-object-id-with-copy/map-object-id-with-copy';
import { geoObjectFormModel } from '../../../geoobject-form';

/** Рендерит возможные действия с геообьектом */
export const MapObjectActions = () => {
    const selectedGeoobject = useUnit(mapObjectsModel.$selectedGeoobject);
    const selectedAspect = useUnit(mapModel.$mapAspect);

    //from update
    const handleUpdateModalFormOpen = () =>{
        geoObjectFormModel.setIsUpdateModalOpen(true)
    }
    //form child
    const handleChildModalFormOpen= ()=>{
        geoObjectFormModel.setIsChildModalOpen(true)
        console.log(geoObjectFormModel.$isChildModalOpen.getState());
        
    }

    if (!selectedGeoobject) {
        return <h3>Нажмите на геообьект, чтобы редактировать его</h3>;
    }

    const geometry = getGeometry(selectedGeoobject);
    if (!geometry) {
        return <h3>Ошибка: выбран обьект с неизвестной геометрией</h3>;
    }

    const { id, name } = selectedGeoobject;
    const { type } = geometry;

    const handleDelete = () => {};

    return (
        <div>
            <h3 className={styles.title}>
                {type}: {name}
            </h3>
            <MapObjectIdWithCopy id={id} />

            <div className={styles.btns}>
                {selectedAspect ? (
                    <Button /* onClick={handleUpdateModalFormOpen} */>Создать {selectedAspect.title} для геообъекта</Button>
                ) : (
                    <>
                        <Button  onClick={handleUpdateModalFormOpen} >Изменить родительский геообъект</Button>
                        <Button  onClick={handleChildModalFormOpen} >Создать дочерний геообъект</Button>
                    </>
                )}

                <Button onClick={handleDelete} color="orange">
                    Удалить
                </Button>
            </div>
        </div>
    );
};
