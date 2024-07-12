import React, { useState } from 'react';
import { useUnit } from 'effector-react';

import { MapView, type Aspect } from '../../entities/map';
import { InfoPlate } from '../../features/info-plate';
import { Aspects } from '../../features/aspects';
import { MapEditorActions, MapEditorPoints } from '../../features/map-editor';
import { GeoobjectEditor } from '../../features/geoobject-editor';

import { aspects } from './lib/mocks';

import styles from './map.module.css';
import { mapModel } from '../../entities/map';

export const Map = () => {
    const $mapMode = useUnit(mapModel.$mapMode);
    const mapEditable = $mapMode === 'edit';

    return (
        <div className={styles.map}>
            <aside className={styles.infoPlate}>
                <InfoPlate />
            </aside>

            <div className={styles.aspects}>
                <Aspects aspects={aspects} />
            </div>

            <div className={styles.view}>
                <MapView>{mapEditable && <MapEditorPoints />}</MapView>
            </div>

            <aside className={styles.actions}>{mapEditable ? <MapEditorActions /> : <GeoobjectEditor />}</aside>
        </div>
    );
};
