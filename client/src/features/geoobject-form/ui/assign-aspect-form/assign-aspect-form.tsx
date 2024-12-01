import React from 'react';
import { useForm } from 'react-hook-form';

import { aspectsModel, type AssignedAspect } from '../../../../entities/geoobject';
import { Modal } from '../../../../shared/ui/modal';

import styles from './assign-aspect-form.module.css';
import { useUnit } from 'effector-react';
import { geoObjectFormModel } from '../../lib/geoobject-form.model';
import { mapObjectsModel } from '../../../map-objects';
import { Form } from '../../../../shared/ui/form';

type Fields = Pick<AssignedAspect, 'endPoint' | 'geographicalObjectId' | 'code'>;

export const AssignAspectForm = () => {
    const selectedGeoobjects = useUnit(mapObjectsModel.$selectedGeoobjects);
    const selectedGeoobject = selectedGeoobjects[0]

    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<Fields>({ defaultValues: { geographicalObjectId: selectedGeoobject?.id } });

    const aspects = useUnit(aspectsModel.$uniqueAspects);

    const handleSave = async (data: Fields) => {
        const selectedAspect = aspects.find(({ code }) => code === data.code)!;

        await aspectsModel.assignAspectFx({ ...data, ...selectedAspect });

        handleClose();
    };

    const handleClose = () => {
        geoObjectFormModel.setIsAssignAspectModalOpen(false);
        reset();
    };

    return (
        <Modal onClose={handleClose}>
            <h2 className={styles.title}>Добавить аспект геообьекту</h2>

            <Form
                fields={[
                    {
                        fieldType: 'input',
                        label: 'ID геообьекта',
                        readOnly: true,
                        ...register('geographicalObjectId', { required: true }),
                    },
                    {
                        fieldType: 'select',
                        label: 'Код аспекта',
                        options: aspects.map(({ code, type }) => ({ name: `${code} - ${type}`, value: code })),
                        ...register('code', { required: true }),
                    },
                    {
                        fieldType: 'textarea',
                        label: 'Описание геообьекта для аспекта',
                        ...register('endPoint', { required: true }),
                    },
                ]}
                buttons={[
                    { children: 'Добавить', disabled: !isValid },
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
