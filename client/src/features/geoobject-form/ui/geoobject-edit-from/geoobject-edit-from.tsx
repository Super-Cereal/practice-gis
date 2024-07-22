import React from 'react';

import { useForm } from 'react-hook-form';
import { useUnit } from 'effector-react';

import { TextWithCopy } from '../../../../shared/ui/text-with-copy';
import { Modal } from '../../../../shared/ui/modal';
import { GeoObject, geoObjectModel } from '../../../../entities/geoobject';
import { mapObjectsModel } from '../../../map-objects';

import type { FormFields } from '../../lib/types';
import { geoObjectFormModel } from '../../lib/geoobject-form.model';
import { mapDataToGeoobject } from '../../lib/map-data-to-geoobject';
import { mapGeoObjectToEditorObject } from '../../lib/map-geoobject-to-data';

import { CommonForm } from '../common-form/common-form';
import { ClassifierForm } from '../classifier-form/classifier-form';

import styles from './geoobject-edit-from.module.css';

export const GeoobjectEditFrom = () => {
    // сохраненный  объект для изменения
    const selectedGeoobject = useUnit(mapObjectsModel.$selectedGeoobject);

    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<FormFields>({
        defaultValues: {
            name: selectedGeoobject?.name,
            description: selectedGeoobject?.geoObjectInfo?.commonInfo,
            status: selectedGeoobject?.status,
        },
    });

    if (!selectedGeoobject) {
        return null;
    }

    const handleUpdate = async (data: FormFields) => {
        const updatedObject: GeoObject = {
            // жоска
            ...mapDataToGeoobject(data, mapGeoObjectToEditorObject(selectedGeoobject)),
            id: selectedGeoobject.id,
        };

        geoObjectModel.updateGeoObjectFx(updatedObject);
        geoObjectFormModel.setIsGeoObjectModalOpen(false);
        reset();
    };

    const handleClose = () => {
        geoObjectFormModel.setIsUpdateModalOpen(false);
        reset();
    };

    return (
        <Modal onClose={handleClose}>
            {/* Описание + id полигона */}
            <div className={styles.formGroup}>
                <label>
                    Изменение сохраненного объекта &nbsp;
                    {selectedGeoobject.name}
                </label>
                <TextWithCopy title="ID" text={selectedGeoobject.id} />
            </div>

            <CommonForm
                onClose={handleClose}
                handleSubmit={handleSubmit(handleUpdate)}
                isValid={isValid}
                register={register}
            />

            <ClassifierForm geoObject={selectedGeoobject} />
        </Modal>
    );
};
