import React from 'react';

import { bem, useFormattedTime } from '../../lib';

import { Layout } from '../layout';

import './header.scss';

const b = bem('header');

export const Header = () => {
    const time = useFormattedTime();

    return (
        <div className={b()}>
            <Layout mix={b('layout')}>
                <div>Местное время: {time}</div>
            </Layout>
        </div>
    );
};
