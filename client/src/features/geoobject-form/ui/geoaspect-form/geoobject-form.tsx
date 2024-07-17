import React, { ChangeEvent, useState } from 'react';
import { useUnit } from 'effector-react';
import { nanoid } from 'nanoid';
import { useForm } from 'react-hook-form';

import { Modal } from '../../../../shared/ui/modal';
import { Button } from '../../../../shared/ui/button';
import { geoObjectModel, type DraftGeoObject } from '../../../../entities/geoobject';
import { aspects } from '../../../../widgets/map/lib/mocks';

import { mapEditorModel } from '../../../map-editor';
import { geoObjectFormModel } from '../../lib/geoobject-form.model';
import { usePreparedEditorObject } from '../../lib/use-prepared-editor-object';

import styles from './geoobject-form.module.css';

const typeToLabel = {
    Point: 'точки',
    PolyLine: 'линии',
    Polygon: 'полигона',
};

type Fields = {
    name: string;
    aspect: string;
    description: string;
    classCode: number;
    status: DraftGeoObject['status'];
};

/** Пока что только сохраняет черновики */
export const GeoobjectForm = () => {
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<Fields>();

    const editorObject = usePreparedEditorObject();

    if (!editorObject) {
        return null;
    }

    const handleSave = ({ name, aspect, status, classCode, description }: Fields) => {
        const geobjectToSave: DraftGeoObject = {
            name,
            status: status as DraftGeoObject['status'],
            geometry: {
                borderGeocodes: JSON.stringify({
                    type: editorObject.type,
                    coordinates: editorObject.object.coordinates,
                }),
            },
            geoObjectInfo: {
                commonInfo: description,
            },
            // классифаер на данный момент сперва надо создать
            // geoClassifiers: [
            //     {
            //         code: classCode,
            //     },
            // ],
        };

        geoObjectModel.saveGeoObjectFx(geobjectToSave);

        geoObjectFormModel.setIsGeoObjectModalOpen(false);
    };

    const handleClose = () => geoObjectFormModel.setIsGeoObjectModalOpen(false);

    return (
        <Modal onClose={handleClose}>
            {/* Описание + id полигона */}
            <div className={styles.formGroup}>
                <label>
                    Создание геообъекта на основе &nbsp;
                    {editorObject && typeToLabel[editorObject.type]}
                </label>
                <label>ID: {editorObject.object != null && editorObject?.object._id}</label>
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

                <input
                    className={styles.input}
                    type="number"
                    placeholder="Код классификатора"
                    {...register('classCode', { required: true })}
                />

                <div>
                    <label>Статус: </label>
                    <select className={styles.aspectSelect} {...register('status', { required: true })}>
                        <option value="Актуален">Актуален</option>
                        <option value="Устарел">Устарел</option>
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
