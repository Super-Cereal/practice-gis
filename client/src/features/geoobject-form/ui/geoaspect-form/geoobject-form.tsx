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
import { Classifiers, getClassifierCodeWithType } from '../../lib/classifiers'
import styles from './geoobject-form.module.css';

//нужно получить с бэка список классификаторов

const typeToLabel = {
    Point: 'точки',
    PolyLine: 'линии',
    Polygon: 'полигона',
};

type Fields = {
    name: string;
    aspect: string;
    description: string;
    classCode: string;
    status: DraftGeoObject['status'];
};

/** Пока что только сохраняет черновики */
export const GeoobjectForm = () => {
    //нужно получить с бэка список классификаторов
    const geoClassifiers = Classifiers
    //нужно получить с бэка список классификаторов
    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset
    } = useForm<Fields>();

    const editorObject = usePreparedEditorObject();

    if (!editorObject) {
        return null;
    }

    const handleSave = ({ name, aspect, status, classCode, description }: Fields) => {
        const geobjectToSave: DraftGeoObject = {
            name,
            // status: status as DraftGeoObject['status'],
            geometry: {
                authoritativeKnowledgeSource: '?авторитетный источник инфы?',

                borderGeocodes: JSON.stringify({
                    type: editorObject.type,
                    coordinates: editorObject.object.coordinates,
                }),

                areaValue: 0,
                westToEastLength: 0,
                northToSouthLength: 0,
            },
            geoObjectInfo: {
                languageCode: 'видимо код языка',
                language: 'видимо название языка',
                commonInfo: description,
            },
            // классифаер на данный момент сперва надо создать
            geoClassifier:
            {
                code: getClassifierCodeWithType(editorObject.type, classCode)
            },

        };

        geoObjectModel.saveGeoObjectFx(geobjectToSave);


        geoObjectFormModel.setIsGeoObjectModalOpen(false);
        reset();

    };

    const handleClose = () => {

        geoObjectFormModel.setIsGeoObjectModalOpen(false);
        reset();

    }

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
