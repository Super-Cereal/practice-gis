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
import { TextWithCopy } from '../../../../shared/ui/text-with-copy';
import { Form } from '../../../../shared/ui/form';

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
    const parentGeoObject = useUnit(geoObjectFormModel.$selectedObjectToEdit);


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
        await topologyModel.addParentChildLinkFx({
            parentGeographicalObjectId: parentId,
            childGeographicalObjectId: childId,
        });

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
            <div className={styles.title}>
                <h2>
                    Создание дочернего геообъекта на основе &nbsp;
                    {parentGeoObject?.name}
                </h2>
                <TextWithCopy title="ID родителя" text={parentGeoObject.id} />
            </div>

            <Form
                fields={[
                    {
                        fieldType: 'input',
                        label: 'Название',
                        ...register('name', { required: true }),
                    },
                    {
                        fieldType: 'select',
                        label: 'Аспект',
                        options: aspects.map(({ code, type }) => ({ name: type, value: code })),
                        ...register('aspect', { required: true }),
                    },
                    {
                        fieldType: 'textarea',
                        label: 'Описание',
                        ...register('description', { required: true }),
                    },
                    {
                        fieldType: 'select',
                        label: 'Код классификатора',
                        options: geoClassifiers.map(({ code, name }) => ({ name: `${code} - ${name}`, value: code })),
                    },
                ]}
                buttons={[
                    { disabled: !isValid, children: 'Создать' },
                    {
                        onClick: (e) => {
                            e.preventDefault();
                            handleClose();
                        },
                        color: 'orange',
                        children: 'Закрыть форму',
                    },
                ]}
                onSubmit={handleSubmit(handleSave)}
            />

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
