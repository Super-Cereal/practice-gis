import React from 'react';
import { Popup } from 'react-leaflet';

import { GEO_OBJECT_STATUS, type GeoObject, type GeometryGeoJSON, getCenterByCoords } from '../../../../entities/geoobject';
import { useTimezoneAndLocalTime } from '../../../../shared/lib/time';
import { TextWithCopy } from '../../../../shared/ui/text-with-copy';

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

    const getStatusKey = (status: number) => {
        return Object.entries(GEO_OBJECT_STATUS).find(([_, value]) => value === status)?.[0];
    };
    return (
        <>
            <h3 className={styles.title}>
                {type}: {name}
            </h3>
            <TextWithCopy title="id" text={id} />

            <div className={styles.content}>{geoObjectInfo?.commonInfo}</div>

            <div className={styles.bottom}>
                <div className={styles.textBlock}>
                    <span>
                        <b>Время:</b> {localTime}
                    </span>
                    <span>
                        <b>Таймзона:</b> {timezone}
                    </span>
                </div>

                <span>
                    <b>Язык:</b> {geoObjectInfo?.language}
                </span>

                {object.status &&
                    <span>
                        <b>Статус:</b> {getStatusKey(object.status)}
                    </span>
                }
            </div>
        </>
    );
};
