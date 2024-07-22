import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUnit } from 'effector-react';

import { Modal } from '../../../../shared/ui/modal';
import { Button } from '../../../../shared/ui/button';
import { aspectsModel, GEO_OBJECT_STATUS, geoObjectModel } from '../../../../entities/geoobject';
import { topologyModel } from '../../../../entities/geoobject';
import { mapObjectsModel } from '../../../map-objects/lib/map-objects.model';

import type { FormFields } from '../../lib/types';
import { geoObjectFormModel } from '../../lib/geoobject-form.model';
import { mockedClassifiers } from '../../lib/classifiers';
import { mapDataToGeoobject } from '../../lib/map-data-to-geoobject';
import { mapGeoObjectToEditorObject } from '../../lib/map-geoobject-to-data';

import styles from './geoobject-child-form.module.css';

// создаем новый объект а затем связь ребенок - родитель

const typeToLabel = {
    Point: 'точки',
    PolyLine: 'линии',
    Polygon: 'полигона',
};

export const GeoobjectСhildForm = () => {
    //нужно получить с бэка список классификаторов
    const geoClassifiers = mockedClassifiers;
    //нужно получить с бэка список классификаторов

    const aspects = useUnit(aspectsModel.$uniqueAspects);

    //родитель
    const parentGeoObject = useUnit(mapObjectsModel.$selectedGeoobject);

    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<FormFields>();

    if (!parentGeoObject) {
        return null;
    }
    //геометрия родитея
    const editorObject = mapGeoObjectToEditorObject(parentGeoObject);

    const [showCreateRelationship, setShowCreateRelationship] = useState(false);
    const [parentId, setParentId] = useState('');
    const [childId, setChildId] = useState('');
    const [childName, setChildName] = useState('');

    const handleSave = async (data: FormFields) => {
        const childGeoobject = await geoObjectModel.saveGeoObjectFx(mapDataToGeoobject(data, editorObject));

        setParentId(parentGeoObject.id);
        setChildId(childGeoobject.id);
        setChildName(childGeoobject.name);
        setShowCreateRelationship(true);
    };
    const handleCreateRelationship = async () => {
        await topologyModel.addParentChildLinkFx({ parentGeographicalObjectId: parentId, childGeographicalObjectId: childId });
    
        setShowCreateRelationship(false);
    
        geoObjectFormModel.setIsChildModalOpen(false);
        reset();
    };
    
    const handleClose = () => {
        geoObjectFormModel.setIsChildModalOpen(false);
        reset();
    };

    return (
        <Modal onClose={handleClose}>
            {/* Описание + id полигона */}
            <div className={styles.formGroup}>
                <label>
                    Создание дочернего геообъекта на основе &nbsp;
                    {parentGeoObject?.name}
                </label>
                <label>ID родителя: {parentGeoObject.id}</label>
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
                            <option className={styles.aspectOption} key={aspect.code} value={aspect.type}>
                                {aspect.type}
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
            {showCreateRelationship && (
                <div>
                    <table className={styles.relationTable}>
                        <tbody>
                            <tr>
                                <td>Родительский ID</td>
                                <td>{parentId}</td>
                            </tr>
                            <tr>
                                <td>Имя родителя</td>
                                <td>{parentGeoObject.name}</td>
                            </tr>
                            <tr>
                                <td>Дочерний ID</td>
                                <td>{childId}</td>
                            </tr>
                            <tr>
                                <td>Имя ребенка</td>
                                <td>{childName}</td>
                            </tr>
                        </tbody>
                    </table>

                    <Button onClick={handleCreateRelationship}>Создать связь</Button>
                </div>
            )}
        </Modal>
    );
};
