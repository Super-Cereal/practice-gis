import React from 'react';
import { useUnit } from 'effector-react';
import cx from 'classnames';
import { useMount } from 'react-use';

import { MapView, mapModel } from '../../entities/map';
import { geoObjectModel } from '../../entities/geoobject';
import { InfoPlate } from '../../features/info-plate';
import { Aspects } from '../../features/aspects';
import { MapEditorActions, MapEditorObjects } from '../../features/map-editor';
import { geoObjectFormModel, GeoobjectForm, GeoaspectsList, GeoobjectEditFrom, GeoobjectСhildForm } from '../../features/geoobject-form';
import { MapObjectActions, MapObjects } from '../../features/map-objects';

import { aspects } from './lib/mocks';

import styles from './map.module.css';


/** Рендерит карту и все ее настройки и действия */
export const Map = () => {
    const $mapMode = useUnit(mapModel.$mapMode);

    const isModalFormOpen = useUnit(geoObjectFormModel.$isGeoObjectModalOpen);
    const isModalAspectsOpen = useUnit(geoObjectFormModel.$isAspectsModalOpen);
    const isUpdateModalOpen = useUnit(geoObjectFormModel.$isUpdateModalOpen);
    const isChildModalOpen = useUnit(geoObjectFormModel.$isChildModalOpen);

    const mapEditable = $mapMode === 'edit';

    useMount(() => {
        geoObjectModel.getGeoObjects();
    });

    const requestStatus = useUnit(geoObjectModel.$getGeoObjectsLoading);

    return (
        <>
            <div className={cx(styles.container)}>
                <aside className={styles.infoPlate}>
                    <InfoPlate />
                </aside>

                <div className={styles.aspects}>
                    <Aspects aspects={aspects} />
                </div>

                <div className={styles.map}>
                    <MapView loading={requestStatus === 'pending'}>
                        <MapObjects />

                        {mapEditable && <MapEditorObjects />}
                    </MapView>
                </div>

                <aside className={styles.actions}>{mapEditable ? <MapEditorActions /> : <MapObjectActions />}</aside>
            </div>
            {isUpdateModalOpen && <GeoobjectEditFrom/>}
            {isChildModalOpen && <GeoobjectСhildForm/>}
            {isModalFormOpen && <GeoobjectForm />}
           {/*  {isModalAspectsOpen && <GeoaspectsList />} */}
        </>
    );
};
