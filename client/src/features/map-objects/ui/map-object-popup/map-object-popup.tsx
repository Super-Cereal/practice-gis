import React from 'react';
import { Popup } from 'react-leaflet';
import { useUnit } from 'effector-react';
import { Copy as CopyIcon } from 'react-bootstrap-icons';

import { Button } from '../../../../shared/ui/button';
import { mapModel } from '../../../../entities/map';
import { GeoObject } from '../../../../entities/geoobject';

import { EditorObjectType } from '../../../map-editor';
import { geoObjectFormModel } from '../../../geoobject-form';

import styles from './map-object-popup.module.css';
import { MapObjectIdWithCopy } from '../map-object-id-with-copy/map-object-id-with-copy';

interface Props {
    onDelete: () => void;
    object: GeoObject;
    type: EditorObjectType;
}

/** Рендерит попап с описанием для геообьектов на карте */
export const MapObjectPopup = (props: Props) => (
    <Popup>
        <Content {...props} />
    </Popup>
);

/** Выделяем отдельно, чтобы не рендерить, пока попап скрыт */
const Content = ({ onDelete, object, type }: Props) => {
    const { id, name, status, geoObjectInfo } = object;
    console.log('content');

    return (
        <>
            <h3 className={styles.title}>
                {type}: {name}
            </h3>
            <MapObjectIdWithCopy id={id} />

            <span className={styles.info}>{geoObjectInfo?.commonInfo}</span>
        </>
    );
};
