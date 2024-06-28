import React, { useState } from 'react';

import { bem } from '../../shared/lib';
import { InfoPlate } from '../../features/info-plate';
import { Settings } from '../../features/settings';
import { MapView, type Aspect } from '../../entities/map';

import { aspects } from './lib/mocks';

import './map.scss';

const b = bem('map');

export const Map = () => {
    const [aspect, setAspect] = useState<Aspect>(aspects[0]);

    return (
        <div className={b()}>
            <div className={b('info-plate')}>
                <InfoPlate />
            </div>

            <div className={b('settings')}>
                <Settings aspects={aspects} selected={aspect} setSelected={setAspect} />
            </div>

            <div className={b('map-view')}>
                <MapView />
            </div>
        </div>
    );
};
