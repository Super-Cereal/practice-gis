import React, { FC, useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';
import cx from 'classnames';

import { type GeoObject, classifiersModel, type Classifier } from '../../../../entities/geoobject';
import { Button } from '../../../../shared/ui/button';

import { FormFieldsForClassifier } from '../../lib/types';

import styles from './classifier-from.module.css';

interface ClassifierFormProps {
    geoObject: GeoObject;
}

export const ClassifierForm: FC<ClassifierFormProps> = ({ geoObject }) => {
    //классы с бэка
    const geoClassifiers = useUnit(classifiersModel.$classifiers);

    useEffect(() => {
        classifiersModel.getClassifiers();
    }, []);

    //выбранный класс
    const [selectedClassifier, setSelectedClassifier] = useState<Classifier | null>(
        geoObject.geoObjectInfo?.classifiers?.[0] || null,
    );

    const handleSelectClassifier = (classifier: Classifier) => {
        setSelectedClassifier(classifier);
    };

    //добавление класса объекту
    const handleAddClassifierToObject = async () => {
        if (!selectedClassifier?.id || !geoObject) {
            return;
        }

        const classifierId = selectedClassifier.id;
        await classifiersModel.addGeoObjectClassifierFx({ geoObjectId: geoObject.id, classifierId });
    };

    // поля для формы создания Нового классификатора
    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<FormFieldsForClassifier>({});

    //создание нового класса
    const handleSaveClassifier = async (data: FormFieldsForClassifier) => {
        await classifiersModel.saveClassifierFx(data);

        setIsCreateClassifierFormOpen(false);
        reset();
    };

    const [isCreateClassifierFormOpen, setIsCreateClassifierFormOpen] = useState(false);

    return (
        <>
            <div className={styles.classifierGroup}>
                <label>Код классификатора: </label>
                <select
                    className={styles.classifierSelect}
                    value={selectedClassifier?.code}
                    onChange={(e) => {
                        const selectedClassifier = geoClassifiers.find((cl) => cl.code === e.target.value);
                        if (selectedClassifier) {
                            handleSelectClassifier(selectedClassifier);
                        }
                    }}
                >
                    <option value="">Выберите классификатор</option>
                    {geoClassifiers.map((cl) => (
                        <option className={styles.aspectOption} key={cl.code} value={cl.code}>
                            {cl.code} - {cl.commonInfo}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.btns} role="group">
                <Button mix={styles.btn} onClick={handleAddClassifierToObject} disabled={!selectedClassifier}>
                    Добавить классификатор объекту
                </Button>
                <Button mix={styles.btn} onClick={() => setIsCreateClassifierFormOpen(true)}>
                    Создать новый классификатор
                </Button>
            </div>
            {isCreateClassifierFormOpen && (
                <form
                    onSubmit={handleSubmit(handleSaveClassifier)}
                    className={cx(styles.form, styles.newClassifierForm)}
                >
                    <label>
                        Имя классификатора:
                        <input className={styles.input} type="text" {...register('name', { required: true })} />
                    </label>
                    <label>
                        Код классификатора:
                        <input className={styles.input} type="text" {...register('code', { required: true })} />
                    </label>
                    <label>
                        Описание классификатора:
                        <input className={styles.input} type="text" {...register('commonInfo', { required: true })} />
                    </label>

                    <div className={cx(styles.btns, styles.reversed)}>
                        <Button mix={styles.btn}>Создать классификатор</Button>
                        <Button
                            mix={styles.btn}
                            color="orange"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsCreateClassifierFormOpen(false);
                            }}
                        >
                            Отменить создание
                        </Button>
                    </div>
                </form>
            )}
        </>
    );
};
