import React, { useState } from 'react';
import cx from 'classnames';
import { useUnit } from 'effector-react';

import { mapModel, type Aspect } from '../../entities/map';
import styles from './aspects.module.css';

interface Props {
    aspects: Aspect[];
}

/** Рендерит список радио-кнопок с выбором аспекта геообьектов */
export const Aspects = ({ aspects }: Props) => {
    const $mapAspect = useUnit(mapModel.$mapAspect);

    const [AllSelect, setAllSelect] = useState(true)
    const HandleAll = () => {
        mapModel.setMapAspect(null)
        setAllSelect(true)

    }
    return (
        <div aria-label="Аспекты" role="radiogroup" className={cx(styles.list, 'a11y')}>
            <button
                role="radio"
                aria-checked={AllSelect}
                className={cx(styles.aspect, { [styles.selected!]: AllSelect })}

                onClick={() => HandleAll()}
            >
                Не выбран
            </button>
            {aspects.map((aspect) => {
                const { id, title } = aspect;

                const isSelected = $mapAspect?.id === id;

                return (
                    <button
                        role="radio"
                        aria-checked={isSelected}
                        className={cx(styles.aspect, { [styles.selected!]: isSelected })}
                        key={id}
                        onClick={() => {mapModel.setMapAspect(isSelected ? null : aspect); setAllSelect(false)}}
                    >
                        {title}
                    </button>
                );
            })}
        </div>
    );
};
