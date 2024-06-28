import React from 'react';

import { bem } from '../../lib';

import './index.scss';

interface Props extends React.PropsWithChildren {
    disabled?: boolean;
    mix?: string;
    onClick?: () => void;
    color?: 'blue' | 'orange';
    size?: 's' | 'm';
}

const b = bem('button');

export const Button = ({ disabled, mix, onClick, color = 'blue', children, size = 'm' }: Props) => {
    return (
        <button className={b(null, { color, size }, mix)} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};
