import React from 'react';
import { useUnit } from 'effector-react';

import { bem } from '../../shared/lib';
import { mapModel } from '../../entities/map/lib/map.model';

import './info-plate.scss';

const b = bem('info-plate')

export const InfoPlate = () => {
    // const $map = useUnit(mapModel.$map);

    // const center = $map?.getCenter();

    return <div className={b()}>InfoPlate</div>;
};
