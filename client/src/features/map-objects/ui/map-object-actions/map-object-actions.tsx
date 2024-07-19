import React from 'react';
import { useUnit } from 'effector-react';

import { Button } from '../../../../shared/ui/button';
import { mapObjectsModel } from '../../lib/map-objects.model';
import { mapModel } from '../../../../entities/map';

import styles from './map-object-actions.module.css';
import { getGeometry } from '../../../../entities/geoobject';
import { MapObjectIdWithCopy } from '../map-object-id-with-copy/map-object-id-with-copy';

/** Рендерит возможные действия с геообьектом */
export const MapObjectActions = () => {
    const selectedGeoobject = useUnit(mapObjectsModel.$selectedGeoobject);
    const selectedAspect = useUnit(mapModel.$mapAspect);

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
                    <Button /* onClick={handleModalFormOpen} */>Создать {selectedAspect.title} для геообъекта</Button>
                ) : (
                    <>
                        <Button /* onClick={handleModalFormOpen} */>Изменить родительский геообъект</Button>
                        <Button /* onClick={handleModalFormOpen} */>Создать дочерний геообъект</Button>
                    </>
                )}

                <Button onClick={handleDelete} color="orange">
                    Удалить
                </Button>
            </div>
        </div>
    );
};
