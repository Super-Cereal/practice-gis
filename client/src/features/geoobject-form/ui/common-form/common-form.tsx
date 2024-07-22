import React from 'react';
import type { UseFormRegister } from 'react-hook-form';

import { Form } from '../../../../shared/ui/form';

import type { FormFields } from '../../lib/types';
import { mockedGeoNames } from '../../lib/geoNames';

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
        <Form
            fields={[
                { fieldType: 'input', label: 'Название', type: 'text', ...register('name', { required: true }) },
                {
                    fieldType: 'select',
                    label: 'Код географического объекта',
                    options: geoCodes.map(({ geoNamesFeatureCode, featureNameEn }) => ({
                        name: `${geoNamesFeatureCode} - ${featureNameEn}`,
                        value: geoNamesFeatureCode,
                    })),
                    ...register('geoNamesFeatureCode', { required: true }),
                },
                {
                    fieldType: 'textarea',
                    label: 'Описание',
                    ...register('description', { required: true }),
                },
            ]}
            buttons={[
                { disabled: !isValid, children: 'Сохранить' },
                {
                    onClick: (e) => {
                        e.preventDefault();
                        onClose();
                    },
                    color: 'orange',
                    children: 'Закрыть форму',
                },
            ]}
            onSubmit={handleSubmit}
        />
    );
};
