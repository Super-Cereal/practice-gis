import React from 'react';
import { useForm } from 'react-hook-form';
import { useUnit } from 'effector-react';

import { geoObjectModel } from '../../../../entities/geoobject';
import { Modal } from '../../../../shared/ui/modal';
import { mapEditorModel } from '../../../map-editor';

import type { FormFields } from '../../lib/types';
import { geoObjectFormModel } from '../../lib/geoobject-form.model';
import { mapDataToGeoobject } from '../../lib/map-data-to-geoobject';
import { CommonForm } from '../common-form/common-form';

import { mapModel } from '../../../../entities/map';
import { mapObjectsModel } from '../../../map-objects';

import styles from './new-geoobject-form.module.css';

const typeToLabel = {
    Point: 'точки',
    PolyLine: 'линии',
    Polygon: 'полигона',
};

/** Форма сохраняет черновики */
export const NewGeoobjectForm = () => {
    // поля для формы
    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<FormFields>();

    // черновая геометрия
    const editorObject = useUnit(geoObjectFormModel.$selectedEditorObject);

    if (!editorObject) {
        return null;
    }

    const handleSave = async (data: FormFields) => {
        const savedGeoobject = await geoObjectModel.saveGeoObjectFx(mapDataToGeoobject(data, editorObject));

        // После успешного сохранения удаляем выбранный обьект
        mapEditorModel.deleteObject(editorObject._id);

        // Открываем модалку редактирования
        mapModel.setMapMode('view');

        /*    mapObjectsModel.setSelectedGeoobject(savedGeoobject);  !!!!!!!!!!!!!!!!!!!!!!*/

        geoObjectFormModel.setIsUpdateModalOpen(true);

        handleClose();
    };

    const handleClose = () => {
        geoObjectFormModel.setIsGeoObjectModalOpen(false);
        reset();
    };

    return (
        <Modal onClose={handleClose}>
            <h2 className={styles.title}>Создание геообъекта на основе &nbsp;{typeToLabel[editorObject.type]}</h2>

            <CommonForm
                onClose={handleClose}
                register={register}
                handleSubmit={handleSubmit(handleSave)}
                isValid={isValid}
            />
        </Modal>
    );
};
