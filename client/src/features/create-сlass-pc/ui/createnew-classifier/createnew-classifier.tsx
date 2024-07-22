import React, { useEffect } from 'react'
import styles from './createnew-classifier.module.css'
import { useUnit } from 'effector-react';
import { classifiersModel } from '../../../../entities/geoobject';
import { FormFieldsForClassifier } from '../../../geoobject-form/lib/types';
import { useForm } from 'react-hook-form';
import cx from 'classnames';
import { Button } from '../../../../shared/ui/button';
import { Modal } from '../../../../shared/ui/modal';

export const CreatenewClassifier = () => {

    useEffect(() => {
        classifiersModel.getClassifiers();
    }, []);

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

        classifiersModel.setIsNewClassModalOpen(false)
        reset();
    };
    const handleClose = () => {
        classifiersModel.setIsNewClassModalOpen(false)
    }
    return (
        <Modal onClose={handleClose}>
            <h3 className={styles.title}>Добавление нового классификатора</h3>
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

                <div className={cx(styles.btns)}>
                    <Button mix={styles.btn}>Создать</Button>
                    <Button
                        mix={styles.btn}
                        color="orange"
                        onClick={(e) => {
                            e.preventDefault();
                            handleClose()
                        }}
                    >
                        Закрыть форму
                    </Button>
                </div>
            </form>
        </Modal>

    )
}
