import React, { FC, useState } from 'react';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';

import { type GeoObject, classifiersModel, type Classifier, geoObjectModel } from '../../../../entities/geoobject';

import { FormFieldsForClassifier } from '../../lib/types';

import { Form } from '../../../../shared/ui/form';
import { geoObjectFormModel } from '../../lib/geoobject-form.model';

interface ClassifierFormProps {
    geoObject: GeoObject;
}

export const ClassifierForm: FC<ClassifierFormProps> = ({ geoObject }) => {
    //классы с бэка
    const geoClassifiers = useUnit(classifiersModel.$classifiers);

    //выбранный класс
    const [selectedClassifier, setSelectedClassifier] = useState<Classifier | null>(
        geoObject.geoObjectInfo?.classifiers?.[0] || geoClassifiers[0] || null,
    );

    const handleSelectClassifier = (classifier: Classifier) => {
        setSelectedClassifier(classifier);
    };

    //добавление класса объекту
    const handleAddClassifierToObject = async () => {
        if (!selectedClassifier?.id || !geoObject) {
            return;
        }

        await classifiersModel.addGeoObjectClassifierFx({
            geoObjectId: geoObject.id,
            classifierId: selectedClassifier.id,
        });

        geoObjectFormModel.setIsClassifierFormOpen(false);
    };

    // поля для формы создания Нового классификатора
    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<FormFieldsForClassifier>();

    //создание нового класса
    const handleSaveClassifier = async (data: FormFieldsForClassifier) => {
        const classifier = await classifiersModel.saveClassifierFx(data);

        setIsCreateClassifierFormOpen(false);
        setSelectedClassifier(classifier);
        reset();
    };

    const [isCreateClassifierFormOpen, setIsCreateClassifierFormOpen] = useState(false);

    return (
        <>
            <Form
                fields={[
                    {
                        fieldType: 'select',
                        label: 'Код классификатора',
                        value: selectedClassifier?.code,
                        onChange: (e) => {
                            const selectedClassifier = geoClassifiers.find((cl) => cl.code === e.target.value);

                            if (selectedClassifier) {
                                handleSelectClassifier(selectedClassifier);
                            }
                        },
                        options: geoClassifiers.map(({ code, name }) => ({ name: `${code} - ${name}`, value: code! })),
                    },
                ]}
                buttons={[
                    { children: 'Добавить классификатор объекту' },
                    {
                        children: 'Создать новый классификатор',
                        onClick: (e) => {
                            e.preventDefault();
                            setIsCreateClassifierFormOpen(true);
                        },
                    },
                ]}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddClassifierToObject();
                }}
            />

            {isCreateClassifierFormOpen && (
                <Form
                    fields={[
                        {
                            fieldType: 'input',
                            label: 'Имя классификатора',
                            ...register('name', { required: true }),
                        },
                        {
                            fieldType: 'input',
                            label: 'Код классификатора',
                            ...register('code', { required: true }),
                        },
                        {
                            fieldType: 'textarea',
                            label: 'Описание классификатора',
                            ...register('commonInfo', { required: true }),
                        },
                    ]}
                    buttons={[
                        { disabled: !isValid, children: 'Создать классификатор' },
                        {
                            color: 'orange',
                            onClick: (e) => {
                                e.preventDefault();
                                setIsCreateClassifierFormOpen(false);
                            },
                            children: 'Отменить создание',
                        },
                    ]}
                    onSubmit={handleSubmit(handleSaveClassifier)}
                />
            )}
        </>
    );
};
