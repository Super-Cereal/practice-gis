import React, { useState } from 'react';
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
import { editorModel } from '../../../map-editor/lib/editor.model';
import { ClassifierForm } from '../classifier-form/classifier-form';
import { mockedGeoNames } from '../../lib/geoNames';

const typeToLabel = {
    Point: 'точки',
    PolyLine: 'линии',
    Polygon: 'полигона',
};

/** Пока что только сохраняет черновики */
export const GeoobjectForm = () => {
    const geoCodes = mockedGeoNames
    const [GeoObjectId, setGeoObjectId] = useState('')
    const isClassifierFormOpen = useUnit(geoObjectFormModel.$isClassifierFormOpen)

    // поля для формы
    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<FormFields>();

    //черновая геометрия
    const editorObject = useUnit(geoObjectFormModel.$selectedEditorObject);

    if (!editorObject) {
        return null;
    }

    const handleSave = async (data: FormFields) => {
        const response = await geoObjectModel.saveGeoObjectFx(mapDataToGeoobject(data, editorObject));

        // Сохраняем id геообъекта в состояние приложения
        setGeoObjectId(response.id);
        // Отображаем блок для добавления классификатора
        geoObjectFormModel.setIsClassifierFormOpen(true)

        // После успешного сохранения удаляем выбранный обьект
        editorModel.deleteObject(editorObject._id);

        /* geoObjectFormModel.setIsGeoObjectModalOpen(false);
        reset(); */
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
                <div>
                    <label>Код географического объекта: </label>
                    <select className={styles.aspectSelect} {...register('geoNamesFeatureCode', { required: true })}>
                        {geoCodes.map((geoCode) => (
                            <option className={styles.aspectOption} key={geoCode.id} value={geoCode.geoNamesFeatureCode}>
                             {geoCode.geoNamesFeatureCode}  -  {geoCode.featureNameEn} 
                            </option>
                        ))}
                    </select>
                </div>

                <textarea
                    className={styles.textarea}
                    placeholder="Описание"
                    {...register('description', { required: true })}
                />
                <div>
                    <label>Статус: </label>
                    <select
                        className={styles.aspectSelect}
                        defaultValue={GEO_OBJECT_STATUS.actual}
                        {...register('status', { required: true })}
                    >
                        {Object.keys(GEO_OBJECT_STATUS).map((key) => (
                            // @ts-ignore
                            <option key={key} value={GEO_OBJECT_STATUS[key]}>
                                {key}
                            </option>
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
            {
                isClassifierFormOpen && <>
                    <ClassifierForm geoObjectId={GeoObjectId} />
                </>
            }
        </Modal>
    );
};
