import React from 'react';
import { useUnit } from 'effector-react';
import cx from 'classnames';
import { useMount } from 'react-use';

import { MapView, mapModel } from '../../entities/map';
import { aspectsModel, classifiersModel, geoObjectModel, topologyModel } from '../../entities/geoobject';
import { InfoPlate } from '../../features/info-plate';
import { Aspects, NewAspectForm } from '../../features/aspects';
import { MapEditorActions, MapEditorObjects } from '../../features/map-editor';
import {
    geoObjectFormModel,
    NewGeoobjectForm,
    AssignAspectForm,
    GeoobjectEditFrom,
    GeoobjectСhildForm,
    TopologyForm,
} from '../../features/geoobject-form';
import { MapObjectActions, MapObjects } from '../../features/map-objects';
import { TopologyObjects } from '../../features/topology';
import { CreatenewClassifier } from '../../features/create-сlass-pc';

import styles from './map.module.css';

/** Рендерит карту и все ее настройки и действия */
export const Map = () => {
    const mapMode = useUnit(mapModel.$mapMode);

    const isNewGeoobjectModalOpen = useUnit(geoObjectFormModel.$isGeoObjectModalOpen);
    const isUpdateModalOpen = useUnit(geoObjectFormModel.$isUpdateModalOpen);

    const isNewClassModalOpen = useUnit(classifiersModel.$isNewClassModalOpen);

    const isChildModalOpen = useUnit(geoObjectFormModel.$isChildModalOpen);
    const isTopologyFormOpen = useUnit(geoObjectFormModel.$isTopologyFormOpen);

    const isNewAspectModalOpen = useUnit(aspectsModel.$isNewAspectModalOpen);
    const isAssignAspectModalOpen = useUnit(geoObjectFormModel.$isAssignAspectModalOpen);

    const mapEditable = mapMode === 'edit';

    useMount(() => {
        geoObjectModel.getGeoObjects();

        aspectsModel.getAspectsFx();

        classifiersModel.getClassifiers();

        topologyModel.getTopologies();
        topologyModel.getParentChildLinks();
    });

    const requestStatus = useUnit(geoObjectModel.$getGeoObjectsLoading);

    return (
        <>
            <div className={cx(styles.container)}>
                <aside className={styles.infoPlate}>
                    <InfoPlate />
                </aside>

                <div className={styles.aspects}>
                    <Aspects />
                </div>

                <div className={styles.map}>
                    <MapView loading={requestStatus === 'pending'}>
                        <MapObjects />
                        <TopologyObjects />

                        {mapEditable && <MapEditorObjects />}
                    </MapView>
                </div>

                <aside className={styles.actions}>{mapEditable ? <MapEditorActions /> : <MapObjectActions />}</aside>
            </div>
            {isUpdateModalOpen && <GeoobjectEditFrom />}
            {isChildModalOpen && <GeoobjectСhildForm />}
            {isNewGeoobjectModalOpen && <NewGeoobjectForm />}
            {isTopologyFormOpen && <TopologyForm />}

            {isNewAspectModalOpen && <NewAspectForm />}
            {isNewClassModalOpen && <CreatenewClassifier />}
            {isAssignAspectModalOpen && <AssignAspectForm />}
        </>
    );
};
