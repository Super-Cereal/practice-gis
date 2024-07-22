import React, { useState } from 'react';
import cx from 'classnames';
import { useUnit } from 'effector-react';

import { mapModel } from '../../../../entities/map';
import { aspectsModel } from '../../../../entities/geoobject';

import styles from './aspects.module.css';

/** Рендерит список радио-кнопок с выбором аспекта геообьектов */
export const Aspects = () => {
    const mapAspect = useUnit(mapModel.$mapAspect);
    const aspects = useUnit(aspectsModel.$uniqueAspects);

    return (
        <div aria-label="Аспекты" role="radiogroup" className={cx(styles.list, 'a11y')}>
            <button
                role="radio"
                aria-checked={!mapAspect}
                className={cx(styles.aspect, { [styles.selected!]: !mapAspect })}
                onClick={() => mapModel.setMapAspect(null)}
            >
                Аспект не выбран
            </button>

            {aspects.map((aspect) => {
                const { code, type } = aspect;

                const isSelected = mapAspect?.code === code;

                return (
                    <button
                        role="radio"
                        aria-checked={isSelected}
                        className={cx(styles.aspect, { [styles.selected!]: isSelected })}
                        key={code}
                        onClick={() => mapModel.setMapAspect(isSelected ? null : aspect)}
                    >
                        {type}
                    </button>
                );
            })}
        </div>
    );
};
