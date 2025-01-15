import React from 'react';
import { useUnit } from 'effector-react';
import { Button } from '../../../../shared/ui/button';
import { geoObjectFormModel } from '../../../geoobject-form';
import { MapObjectDescription } from '../map-object-description/map-object-description';
import { GeoObject, geoObjectModel, getGeometry } from '../../../../entities/geoobject';
import styles from './object-actions.module.css';
import { mapObjectsModel } from '../../lib/map-objects.model';
import { mapModel } from '../../../../entities/map';
import { editorModel } from '../../../map-editor/lib/editor.model';

interface MapObjectItemProps {
    geoObject: GeoObject;
    parentGeoObjects: (GeoObject | undefined)[];
    childGeoObjects: (GeoObject | undefined)[];
}

export const handleZoom = (geoObject: GeoObject) => {
    const currentZoomedObject = mapObjectsModel.$zoomedObject.getState();

    if (currentZoomedObject?.id === geoObject.id) {
        // Объект тот же, вызываем событие для перезума
        mapObjectsModel.triggerZoom();
    } else {
        // Устанавливаем новый зум-объект
        mapObjectsModel.setZoomedObject(geoObject);
    }
};

export const MapObjectItem: React.FC<MapObjectItemProps> = ({ geoObject, parentGeoObjects, childGeoObjects }) => {
    const mapMode = useUnit(mapModel.$mapMode);
    const mapEditable = mapMode === 'edit';
    const isClippingMode = useUnit(mapModel.$isClippingMode);

    const handleUpdateModalFormOpen = () => {
        geoObjectFormModel.setSelectedObjectToEdit(geoObject);
        geoObjectFormModel.setIsUpdateModalOpen(true);
    };

    const handleChildModalFormOpen = () => {
        geoObjectFormModel.setSelectedObjectToEdit(geoObject);
        geoObjectFormModel.setIsChildModalOpen(true);
    };

    const handleDelete = async (geoObject: GeoObject) => {
        await mapObjectsModel.removeSelectedGeoobject(geoObject);
        await geoObjectModel.deleteGeoObjectFx(geoObject.id);
    };

    const handleUnSelect = async (geoObject: GeoObject) => {
        await mapObjectsModel.removeSelectedGeoobject(geoObject);
    };

    const handleClipping = (geoObject: GeoObject) => {
        if (!isClippingMode) {
            handleZoom(geoObject);
            mapModel.setEditorPointsOnCorners(false);
            editorModel.setClippedObject(geoObject);
        } else {
            editorModel.setClippedObject(null);
        }
        mapModel.setClippingMode(!isClippingMode);
    };
    const handleDescription = (geoObject: GeoObject) => {
        geoObjectFormModel.setSelectedObjectToEdit(geoObject);

        mapModel.setDescriptionMode(true);
    };

    return (
        <div className={styles.wrapper}>
            <MapObjectDescription
                parentGeoObjects={parentGeoObjects}
                geoObject={geoObject}
                childGeoObjects={childGeoObjects}
            />
            <div className={styles.btns}>
                <Button mix={styles.btn} onClick={() => handleUnSelect(geoObject)} color="violet">
                    Снять выделение
                </Button>
                <Button mix={styles.btn} onClick={() => handleZoom(geoObject)}>
                    Приблизить
                </Button>
                <Button mix={styles.btn} onClick={() => handleDescription(geoObject)}>
                    Раскрыть описание
                </Button>
                {mapEditable && (
                    <Button mix={styles.btn} onClick={() => handleClipping(geoObject)}>
                        {isClippingMode ? 'Отключить редактор' : 'Редактировать местность'}
                    </Button>
                )}

                <Button mix={styles.btn} onClick={handleUpdateModalFormOpen}>
                    Изменить геообъект
                </Button>
                <Button mix={styles.btn} onClick={handleChildModalFormOpen}>
                    Создать дочерний геообъект
                </Button>
                <Button mix={styles.btn} onClick={() => handleDelete(geoObject)} color="orange">
                    Удалить
                </Button>
            </div>
        </div>
    );
};
