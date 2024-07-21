import React from 'react';
import { Popup } from 'react-leaflet';

import { type GeoObject, type GeometryGeoJSON, getCenterByCoords } from '../../../../entities/geoobject';
import { useTimezoneAndLocalTime } from '../../../../shared/lib/time';

import { MapObjectIdWithCopy } from '../map-object-id-with-copy/map-object-id-with-copy';

import styles from './map-object-popup.module.css';

interface Props {
    object: GeoObject;
    geometry: GeometryGeoJSON;

    /**
     * Попап не анмаунтится автоматически, поэтому костылим это сами,
     * иначе будет запущено очень много интервалов и начнутся лаги
     */
    visible: boolean;
}

/** Рендерит попап с описанием для геообьектов на карте */
export const MapObjectPopup = (props: Props) => {
    return <Popup>{props.visible && <Content {...props} />}</Popup>;
};

/** Выделяем отдельно, чтобы не рендерить, пока попап скрыт */
const Content = ({ object, geometry: { type, coordinates } }: Props) => {
    const { id, name, status, geoObjectInfo } = object;

    const { timezone, localTime } = useTimezoneAndLocalTime(getCenterByCoords(coordinates), id);

    return (
        <>
            <h3 className={styles.title}>
                {type}: {name}
            </h3>
            <MapObjectIdWithCopy id={id} />

            <div className={styles.content}>
                <span>Описание: {geoObjectInfo?.commonInfo}</span>
            </div>
            <div className={styles.content}>
                <span>Классификаторы: - </span>
            </div>
            <div className={styles.content}>
                <span>Геокоды: - </span>
            </div>

            <div className={styles.bottom}>
                <div className={styles.bottomBlock}>
                    <span>Время: {localTime}</span>
                    <span>Таймзона: {timezone}</span>
                </div>

                <span>Язык: {geoObjectInfo?.language}</span>
            </div>
        </>
    );
};
