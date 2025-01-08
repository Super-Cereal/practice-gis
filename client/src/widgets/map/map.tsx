import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import cx from 'classnames';
import { useMount } from 'react-use';
import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L, { CRS } from 'leaflet';

import { mapModel } from '../../entities/map';
import { aspectsModel, classifiersModel, geoObjectModel, getGeometry, topologyModel } from '../../entities/geoobject';
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
import { MapObjectActions, MapObjects, mapObjectsModel } from '../../features/map-objects';
import { TopologyObjects } from '../../features/topology';
import { CreatenewClassifier } from '../../features/create-сlass-pc';

import styles from './map.module.css';
import { getGeometryForBounds } from '../../entities/geoobject/lib/getGeometryForBounds';
import { ClippingOverlay } from '../ClippingOverlay/ClippingOverlay';
import { editorModel } from '../../features/map-editor/lib/editor.model';

const MapZoomHandler = () => {
    const map = useUnit(mapModel.$map);
    const zoomedObject = useUnit(mapObjectsModel.$zoomedObject);
    const zoomedObjectTimestamp = useUnit(mapObjectsModel.$zoomedObjectTimestamp);

    useEffect(() => {
        if (zoomedObject && map) {
            const geometry = getGeometry(zoomedObject);
            const boundsCoordinates = getGeometryForBounds(geometry);
            if (boundsCoordinates && boundsCoordinates.length > 0) {
                const bounds = L.latLngBounds(boundsCoordinates);
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
    }, [zoomedObject, zoomedObjectTimestamp, map]); // Добавили timestamp для обработки повторного вызова

    return null;
};
/** Сохраняет map в стор, чтобы его можно было использовать вне компонента MapContainer */
const _MapSetter = () => {
    const map = useMap();

    useEffect(() => {
        mapModel.setMap(map);
    }, [map]);

    return null;
};

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

    const clippedObject = useUnit(editorModel.$clippedObject);

    const mapEditable = mapMode === 'edit';
    const isClipping = useUnit(mapModel.$isClippingMode);

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
                    <MapContainer
                        center={[59.955, 30.3]}
                        zoom={12}
                        style={{ height: '90vh', width: '100%' }}
                        crs={CRS.EPSG3857}
                    >
                        <_MapSetter />

                        <LayersControl position="topright">
                            <LayersControl.Overlay name="Clipping Mask" checked={isClipping}>
                                <ClippingOverlay clippedObject={clippedObject} />
                            </LayersControl.Overlay>
                            <LayersControl.Overlay name="Marker with popup">
                                <Marker position={[59.955, 30.3]}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            </LayersControl.Overlay>
                            <LayersControl.BaseLayer checked name="OpenStreetMap">
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="Satellite">
                                <TileLayer
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                    attribution='&copy; <a href="https://www.esri.com">Esri</a>'
                                />
                            </LayersControl.BaseLayer>
                        </LayersControl>

                        <MapZoomHandler />
                        <MapObjects />
                        <TopologyObjects />
                        {mapEditable && <MapEditorObjects />}
                    </MapContainer>
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
