import React from 'react';
import cx from 'classnames';
import { useUnit } from 'effector-react';

import { mapModel, type Aspect } from '../../entities/map';
import styles from './aspects.module.css';

interface Props {
    aspects: Aspect[];
}

export const Aspects = ({ aspects }: Props) => {
    const [$mapAspect, setMapAspect] = useUnit([mapModel.$mapAspect, mapModel.setMapAspect]);

    return (
        <div aria-label="Аспекты" role="radiogroup" className={cx(styles.list, 'a11y')}>
            {aspects.map((aspect) => {
                const { id, title } = aspect;

                const isSelected = $mapAspect?.id === id;

                return (
                    <button
                        role="radio"
                        aria-checked={isSelected}
                        className={cx(styles.aspect, { [styles.selected!]: isSelected })}
                        key={id}
                        onClick={() => setMapAspect(isSelected ? null : aspect)}
                    >
                        {title}
                    </button>
                );
            })}
        </div>
    );
};
