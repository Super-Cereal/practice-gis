import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import { mapModel } from '../../lib/map.model';

import styles from './map-view.module.css';

/** Рендерит саму карту */
export const MapView = ({ children }: React.PropsWithChildren) => {
    return (
        <div className={styles.map}>
            <MapContainer className={styles.container} center={[59.957, 30.409]} zoom={16} scrollWheelZoom={true}>
                <_MapSetter />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {children}
            </MapContainer>
        </div>
    );
};

/** Сохраняет map в стор, чтобы его можно было использовать вне компонента MapContainer */
const _MapSetter = () => {
    const map = useMap();

    useEffect(() => {
        mapModel.setMap(map);
    }, [map]);

    return null;
};
