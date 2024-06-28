import React from 'react';

import { bem } from '../../shared/lib';
import type { Aspect } from '../../entities/map';

import './settings.scss';

interface Props {
    aspects: Aspect[];
    selected: Aspect;
    setSelected: (aspect: Aspect) => void;
}

const b = bem('settings');

export const Settings = ({ aspects, selected, setSelected }: Props) => {
    return (
        <div aria-label="Аспекты" role="radiogroup" className={b(undefined, undefined, 'a11y')}>
            {aspects.map((aspect) => {
                const { id, title } = aspect;

                const isSelected = selected.id === id;

                return (
                    <button
                        role="radio"
                        aria-checked={isSelected}
                        className={b('aspect', { selected: isSelected })}
                        key={id}
                        onClick={() => setSelected(aspect)}
                    >
                        {title}
                    </button>
                );
            })}
        </div>
    );
};
