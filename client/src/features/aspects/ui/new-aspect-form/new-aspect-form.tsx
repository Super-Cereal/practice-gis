import React from 'react';
import { useForm } from 'react-hook-form';

import { aspectsModel, type DraftAspect } from '../../../../entities/geoobject';
import { Modal } from '../../../../shared/ui/modal';
import { Button } from '../../../../shared/ui/button';

import styles from './new-aspect-form.module.css';

export const NewAspectForm = () => {
    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<DraftAspect>({});

    const handleSave = async (data: DraftAspect) => {
        await aspectsModel.createAspectFx(data);
        handleClose();
    };

    const handleClose = () => {
        aspectsModel.setIsNewAspectModalOpen(false);
        reset();
    };

    return (
        <Modal onClose={handleClose}>
            <h3 className={styles.title}>Добавление нового аспекта</h3>

            <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
                <div>
                    <label>Код аспекта: </label>
                    <input className={styles.input} type="text" {...register('code', { required: true })} />
                </div>

                <div>
                    <label>Название: </label>
                    <input className={styles.input} type="text" {...register('type', { required: true })} />
                </div>

                <div>
                    <label>Описание: </label>
                    <textarea className={styles.textarea} {...register('commonInfo', { required: true })} />
                </div>

                <div className={styles.btns}>
                    <Button mix={styles.btn} disabled={!isValid}>
                        Создать
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
