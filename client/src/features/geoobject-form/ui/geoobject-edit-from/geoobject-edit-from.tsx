import React, { useEffect } from 'react'

import { useForm } from 'react-hook-form';
import { useUnit } from 'effector-react';

import { Modal } from '../../../../shared/ui/modal';
import { Button } from '../../../../shared/ui/button';
import { DraftGeoObject, GEO_OBJECT_STATUS, GeoObject, geoObjectModel } from '../../../../entities/geoobject';
import { aspects } from '../../../../widgets/map/lib/mocks';

import type { FormFields } from '../../lib/types';
import { geoObjectFormModel } from '../../lib/geoobject-form.model';
import { mockedClassifiers } from '../../lib/classifiers';
import { mapDataToGeoobject } from '../../lib/map-data-to-geoobject';

import styles from './geoobject-edit-from.module.css'
import { editorModel } from '../../../map-editor/lib/editor.model';
import { mapObjectsModel } from '../../../map-objects/lib/map-objects.model';
import { mapGeoObjectToEditorObject } from '../../lib/map-geoobject-to-data';
import { updateGeoObjectRequest } from '../../../../entities/geoobject/api/requests';

export const GeoobjectEditFrom = () => {
    //сохраненные объекты
    const savedGeoObjects = useUnit(geoObjectModel.$geoObjects)

    // сохраненный  объект для изменения
    const geoObjectforUpdate = useUnit(mapObjectsModel.$selectedGeoobject)

    //нужно получить с бэка список классификаторов
    const geoClassifiers = mockedClassifiers;
  
    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<FormFields>({
        defaultValues: {
         name: geoObjectforUpdate?.name,
         aspect: '1',
         description: geoObjectforUpdate?.geoObjectInfo?.commonInfo,
         status: geoObjectforUpdate?.status,
         // чето не робит 
         classCode: geoObjectforUpdate?.geoObjectInfo?.classifiers?.[0]?.code ?? '', 
        }
    });


    if (!geoObjectforUpdate) {
        return null;
    }

    const handleUpdate = async (data: FormFields) => {
        const updatedObject: GeoObject = {
            ...mapDataToGeoobject(data, mapGeoObjectToEditorObject(geoObjectforUpdate)),
            id: geoObjectforUpdate.id, // добавляем свойство id
          };
       
        await updateGeoObjectRequest(updatedObject);
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
                    {geoObjectforUpdate.name}
                </label>
                <label>ID: {geoObjectforUpdate.id}</label>
            </div>

            <form className={styles.form}  onSubmit={handleSubmit(handleUpdate)} >
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Название"
                    {...register('name', { required: true })}
                />

                <div>
                    <label>Аспект: </label>
                    <select className={styles.aspectSelect} {...register('aspect', { required: true })}>
                        {aspects.map((aspect) => (
                            <option className={styles.aspectOption} key={aspect.id} value={aspect.title}>
                                {aspect.title}
                            </option>
                        ))}
                    </select>
                </div>

                <textarea
                    className={styles.textarea}
                    placeholder="Описание"
                    {...register('description', { required: true })}
                />

                <div className={styles.classifierGroup}>
                    <label>Код классификатора: </label>
                    <select className={styles.classifierSelect} {...register('classCode', { required: true })}>
                        {geoClassifiers.map((cl) => (
                            <option className={styles.aspectOption} key={cl.code} value={cl.code}>
                                {cl.code} - {cl.commonInfo}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Статус: </label>
                    <select
                        className={styles.aspectSelect}
                        defaultValue={GEO_OBJECT_STATUS.actual}
                        {...register('status', { required: true })}
                    >
                        {Object.keys(GEO_OBJECT_STATUS).map((key) => (
                            // @ts-ignore
                            <option value={GEO_OBJECT_STATUS[key]}>{key}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.btns} role="group">
                    <Button disabled={!isValid} mix={styles.btn}>
                        Сохранить
                    </Button>

                    <Button
                        mix={styles.btn}
                        onClick={(e) => {
                            e.preventDefault();
                            handleClose();
                        }}
                        color="orange"
                    >
                        Закрыть форму
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
