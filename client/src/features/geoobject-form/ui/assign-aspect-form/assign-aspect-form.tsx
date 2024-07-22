import React from 'react';
import { useForm } from 'react-hook-form';

import { aspectsModel, type AssignedAspect } from '../../../../entities/geoobject';
import { Modal } from '../../../../shared/ui/modal';
import { Button } from '../../../../shared/ui/button';

import styles from './assign-aspect-form.module.css';
import { useUnit } from 'effector-react';
import { geoObjectFormModel } from '../../lib/geoobject-form.model';
import { mapObjectsModel } from '../../../map-objects';

type Fields = Pick<AssignedAspect, 'endPoint' | 'geographicalObjectId' | 'code'>;

export const AssignAspectForm = () => {
    const selectedGeoobject = useUnit(mapObjectsModel.$selectedGeoobject);

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
            <h3 className={styles.title}>Добавить аспект геообьекту</h3>

            <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
                <div>
                    <label>ID геообьекта: </label>
                    <input
                        className={styles.input}
                        readOnly={true}
                        type="text"
                        {...register('geographicalObjectId', { required: true })}
                    />
                </div>

                <div>
                    <label>Код аспекта: </label>
                    <select className={styles.aspectSelect} {...register('code', { required: true })}>
                        {aspects.map((aspect) => (
                            <option className={styles.aspectOption} key={aspect.code} value={aspect.code}>
                                {aspect.code} - {aspect.type}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Описание геообьекта для аспекта: </label>
                    <textarea className={styles.textarea} {...register('endPoint', { required: true })} />
                </div>

                <div className={styles.btns}>
                    <Button mix={styles.btn} disabled={!isValid}>
                        Добавить
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
