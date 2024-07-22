import React from 'react';
import { useForm } from 'react-hook-form';

import { aspectsModel, type DraftAspect } from '../../../../entities/geoobject';
import { Modal } from '../../../../shared/ui/modal';

import styles from './new-aspect-form.module.css';
import { Form } from '../../../../shared/ui/form';

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
            <h2 className={styles.title}>Добавление нового аспекта</h2>

            <Form
                fields={[
                    {
                        fieldType: 'input',
                        label: 'Код аспекта',
                        ...register('code', { required: true }),
                    },
                    {
                        fieldType: 'input',
                        label: 'Название',
                        ...register('type', { required: true }),
                    },
                    {
                        fieldType: 'textarea',
                        label: 'Описание',
                        ...register('commonInfo', { required: true }),
                    },
                ]}
                buttons={[
                    { children: 'Создать', disabled: !isValid },
                    {
                        children: 'Закрыть форму',
                        onClick: (e) => {
                            e.preventDefault();
                            handleClose();
                        },
                        color: 'orange',
                    },
                ]}
                onSubmit={handleSubmit(handleSave)}
            />
        </Modal>
    );
};
