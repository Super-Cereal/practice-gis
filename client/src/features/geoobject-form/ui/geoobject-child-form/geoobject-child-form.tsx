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

import styles from './geoobject-child-form.module.css';
import { editorModel } from '../../../map-editor/lib/editor.model';
import { mapObjectsModel } from '../../../map-objects/lib/map-objects.model';
import { addParentChildLinkRequest } from '../../../../entities/geoobject/api/requests';
import { mapGeoObjectToEditorObject } from '../../lib/map-geoobject-to-data';

//создаем новый объект а затем связь ребенок - родитель

const typeToLabel = {
    Point: 'точки',
    PolyLine: 'линии',
    Polygon: 'полигона',
};

export const GeoobjectСhildForm = () => {
    //нужно получить с бэка список классификаторов
    const geoClassifiers = mockedClassifiers;
    //нужно получить с бэка список классификаторов

    //родитель
    const parentGeoObject = useUnit(mapObjectsModel.$selectedGeoobject)  

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


    const handleSave = async (data: FormFields) => {
        const childGeoobject = await geoObjectModel.saveGeoObjectFx(mapDataToGeoobject(data, editorObject));
        
        setParentId(parentGeoObject.id);
        setChildId(childGeoobject.id); 
        setShowCreateRelationship(true); 
        

        
    };
    const handleCreateRelationship = async () => {
        await addParentChildLinkRequest({ ParentGeoObjectId: parentId, ChildGeoObjectId: childId });
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
                <label>ID родителя: {editorObject._id}</label>
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
            {showCreateRelationship && (
                <div>
                    <p>
                        Создать связь между родителем (ID: {parentId}) и ребенком (ID: {childId})?
                    </p>
                    <Button onClick={handleCreateRelationship}>Создать связь</Button>
                </div>
            )}
        </Modal>
    );
};
