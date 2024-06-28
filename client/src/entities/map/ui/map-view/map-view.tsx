import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import { mapModel } from '../../lib/map.model';
import { bem } from '../../../../shared/lib';

import './map-view.scss';

const b = bem('map-view');

const position = [51.505, -0.09] as [number, number];

/** Рендерит всю карту */
export const MapView = () => {
    return (
        <div className={b()}>
            <MapContainer className={b('container')} center={[59.939, 30.316]} zoom={15} scrollWheelZoom={true}>
                {/* <_MapSetter /> */}

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
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
