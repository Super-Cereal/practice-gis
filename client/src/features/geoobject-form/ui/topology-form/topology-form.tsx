import React from 'react';

import { useForm } from 'react-hook-form';
import { useUnit } from 'effector-react';

import { Modal } from '../../../../shared/ui/modal';
import { updateGeoObjectRequest } from '../../../../entities/geoobject/api/requests';
import { GeoObject, topologyModel } from '../../../../entities/geoobject';
import { mapObjectsModel } from '../../../map-objects';

import type { FormFields } from '../../lib/types';
import { geoObjectFormModel } from '../../lib/geoobject-form.model';
import { mapDataToGeoobject } from '../../lib/map-data-to-geoobject';
import { mapGeoObjectToEditorObject } from '../../lib/map-geoobject-to-data';

import { CommonForm } from '../common-form/common-form';
import { ClassifierForm } from '../classifier-form/classifier-form';

import styles from './toplogy-form.module.css';
import { TextWithCopy } from '../../../../shared/ui/text-with-copy';
import { Button } from '../../../../shared/ui/button';

interface Fields {
    geographicalObjectInId: string;
    geographicalObjectOutId: string;
}

export const TopologyForm = () => {
    // сохраненный объект для изменения

    const selectedGeoobject = useUnit(geoObjectFormModel.$selectedObjectToEdit);

    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<Fields>({
        defaultValues: {
            geographicalObjectInId: selectedGeoobject?.id,
        },
    });

    if (!selectedGeoobject) {
        return null;
    }

    const handleAddTopology = async (data: Fields) => {
        await topologyModel.addTopologyFx(data);

        geoObjectFormModel.setIsTopologyFormOpen(false);
        reset();
    };

    const handleClose = () => {
        geoObjectFormModel.setIsTopologyFormOpen(false);
        reset();
    };

    return (
        <Modal onClose={handleClose}>
            <div className={styles.formGroup}>
                <label>
                    Добавление топологической связи для &nbsp;
                    {selectedGeoobject.name}
                </label>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(handleAddTopology)}>
                <div>
                    <label>geographicalObjectInId: </label>
                    <input
                        className={styles.input}
                        type="text"
                        readOnly={true}
                        {...register('geographicalObjectInId', { required: true })}
                    />
                </div>

                <div>
                    <label>geographicalObjectOutId: </label>
                    <input
                        className={styles.input}
                        type="text"
                        {...register('geographicalObjectOutId', { required: true })}
                    />
                </div>

                <div className={styles.btns}>
                    <Button mix={styles.btn} disabled={!isValid}>
                        Создать связь
                    </Button>
                    <Button
                        mix={styles.btn}
                        color="orange"
                        onClick={(e) => {
                            e.preventDefault();
                            handleClose();
                        }}
                    >
                        Закрыть форму
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
