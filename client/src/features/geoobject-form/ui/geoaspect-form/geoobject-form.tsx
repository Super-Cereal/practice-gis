import React from 'react';
import { useForm } from 'react-hook-form';
import { useUnit } from 'effector-react';

import { Modal } from '../../../../shared/ui/modal';
import { Button } from '../../../../shared/ui/button';
import { GEO_OBJECT_STATUS, geoObjectModel } from '../../../../entities/geoobject';
import { aspects } from '../../../../widgets/map/lib/mocks';

import type { FormFields } from '../../lib/types';
import { geoObjectFormModel } from '../../lib/geoobject-form.model';
import { mockedClassifiers } from '../../lib/classifiers';
import { mapDataToGeoobject } from '../../lib/map-data-to-geoobject';

import styles from './geoobject-form.module.css';

//нужно получить с бэка список классификаторов

const typeToLabel = {
    Point: 'точки',
    PolyLine: 'линии',
    Polygon: 'полигона',
};

/** Пока что только сохраняет черновики */
export const GeoobjectForm = () => {
    //нужно получить с бэка список классификаторов
    const geoClassifiers = mockedClassifiers;
    //нужно получить с бэка список классификаторов
    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<FormFields>();

    const editorObject = useUnit(geoObjectFormModel.$selectedEditorObject);

    if (!editorObject) {
        return null;
    }

    const handleSave = (data: FormFields) => {
        geoObjectModel.saveGeoObjectFx(mapDataToGeoobject(data, editorObject));
        geoObjectFormModel.setIsGeoObjectModalOpen(false);
        reset();
    };

    const handleClose = () => {
        geoObjectFormModel.setIsGeoObjectModalOpen(false);
        reset();
    };

    return (
        <Modal onClose={handleClose}>
            {/* Описание + id полигона */}
            <div className={styles.formGroup}>
                <label>
                    Создание геообъекта на основе &nbsp;
                    {editorObject && typeToLabel[editorObject.type]}
                </label>
                <label>ID: {editorObject._id}</label>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
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
};
