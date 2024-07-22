import React from 'react';
import type { UseFormRegister } from 'react-hook-form';

import { Button } from '../../../../shared/ui/button';
import { aspects } from '../../../../widgets/map/lib/mocks';

import type { FormFields } from '../../lib/types';

import { mockedGeoNames } from '../../lib/geoNames';

import styles from './common-form.module.css';

export const CommonForm = ({
    onClose,
    register,
    handleSubmit,
    isValid,
}: {
    onClose: () => void;
    handleSubmit: () => void;

    register: UseFormRegister<FormFields>;
    isValid: boolean;
}) => {
    const geoCodes = mockedGeoNames;

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div>
                <label>Название: </label>
                <input className={styles.input} type="text" {...register('name', { required: true })} />
            </div>

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
            <div>
                <label>Код географического объекта: </label>
                <select className={styles.aspectSelect} {...register('geoNamesFeatureCode', { required: true })}>
                    {geoCodes.map((geoCode) => (
                        <option className={styles.aspectOption} key={geoCode.id} value={geoCode.geoNamesFeatureCode}>
                            {geoCode.geoNamesFeatureCode} - {geoCode.featureNameEn}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Описание: </label>
                <textarea className={styles.textarea} {...register('description', { required: true })} />
            </div>
            {/* <div>
                <label>Статус: </label>
                <select
                    className={styles.aspectSelect}
                    defaultValue={GEO_OBJECT_STATUS.actual}
                    {...register('status', { required: true })}
                >
                    {Object.keys(GEO_OBJECT_STATUS).map((key) => (
                        // @ts-ignore
                        <option key={key} value={GEO_OBJECT_STATUS[key]}>
                            {key}
                        </option>
                    ))}
                </select>
            </div> */}

            <div className={styles.btns} role="group">
                <Button disabled={!isValid} mix={styles.btn}>
                    Сохранить
                </Button>

                <Button
                    mix={styles.btn}
                    onClick={(e) => {
                        e.preventDefault();
                        onClose();
                    }}
                    color="orange"
                >
                    Закрыть форму
                </Button>
            </div>
        </form>
    );
};
