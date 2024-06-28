import React from 'react';

import { Map } from '../../widgets/map';
import { Header } from '../../shared/ui/header/header';
import { bem } from '../../shared/lib';
import { Page } from '../../shared/ui/page';

const b = bem('main');

export const Main = () => {
    return (
        <>
            <Header />
            <Page>
                <Map />
            </Page>
        </>
    );
};
