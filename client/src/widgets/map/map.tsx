import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import cx from 'classnames';

import { MapView, mapModel } from '../../entities/map';
import { geoObjectModel } from '../../entities/geoobject';
import { InfoPlate } from '../../features/info-plate';
import { Aspects } from '../../features/aspects';
import { MapEditorActions, MapEditorObjects } from '../../features/map-editor';
import { geoObjectFormModel, GeoobjectForm, GeoaspectsList } from '../../features/geoobject-form';
import { MapObjects } from '../../features/map-objects';

import { aspects } from './lib/mocks';

import styles from './map.module.css';

/** Рендерит карту и все ее настройки и действия */
export const Map = () => {
    const $mapMode = useUnit(mapModel.$mapMode);

    const isModalFormOpen = useUnit(geoObjectFormModel.$isGeoObjectModalOpen);
    const isModalAspectsOpen = useUnit(geoObjectFormModel.$isAspectsModalOpen);

    const mapEditable = $mapMode === 'edit';

    useEffect(() => {
        geoObjectModel.getGeoObjectsFx();
    }, []);

    const loading = useUnit(geoObjectModel.$getGeoObjectsLoading);

    if (loading === 'pending') {
        return <>загрузка</>;
    }

    return (
        <>
            <div className={cx(styles.map, mapEditable && styles.editable)}>
                <aside className={styles.infoPlate}>
                    <InfoPlate />
                </aside>

                <div className={styles.aspects}>
                    <Aspects aspects={aspects} />
                </div>

                <div className={styles.view}>
                    <MapView>
                        <MapObjects />

                        {mapEditable && <MapEditorObjects />}
                    </MapView>
                </div>

                <aside className={styles.actions}>{mapEditable && <MapEditorActions />}</aside>
            </div>

            {isModalFormOpen && <GeoobjectForm />}
            {isModalAspectsOpen && <GeoaspectsList />}
        </>
    );
};
