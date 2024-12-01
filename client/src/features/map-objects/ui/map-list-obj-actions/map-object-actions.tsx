import React from 'react';
import { useUnit } from 'effector-react';
import { mapObjectsModel } from '../../lib/map-objects.model';
import { geoObjectModel, topologyModel } from '../../../../entities/geoobject';
import { MapObjectItem } from '../object-actions/object-actions';
import { mapModel } from '../../../../entities/map';


/** Рендерит список карточек с информацией о геобъекте и возможных действиях*/
export const MapObjectActions = () => {

    const selectedGeoobjects = useUnit(mapObjectsModel.$selectedGeoobjects);
    const geoObjects = useUnit(geoObjectModel.$geoObjects);
    const parentChildLinks = useUnit(topologyModel.$parentChildLinks);

    if (selectedGeoobjects.length === 0) {
        return <h3>Нажмите на геообъект, чтобы редактировать его</h3>;
    }
    return (
        <div>
            {selectedGeoobjects.map((geoObject) => {
                const childGeoObjects = parentChildLinks
                    .filter((link) => link.parentGeographicalObjectId === geoObject.id)
                    .map((link) => link.childGeographicalObjectId)
                    .flatMap((id) => geoObjects.find((item) => item.id === id));

                const parentGeoObjects = parentChildLinks
                    .filter((link) => link.childGeographicalObjectId === geoObject.id)
                    .map((link) => link.parentGeographicalObjectId)
                    .flatMap((id) => geoObjects.find((item) => item.id === id));

                return (
                    <MapObjectItem
                        key={geoObject.id}
                        geoObject={geoObject}
                        parentGeoObjects={parentGeoObjects}
                        childGeoObjects={childGeoObjects}
                    />
                );
            })}
        </div>
    );
};
