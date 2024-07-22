import { createStore, createEvent, sample } from 'effector';

import { geoObjectModel, type GeoObject } from '../../../entities/geoobject';

const $selectedGeoobject = createStore<GeoObject | null>(null);
const setSelectedGeoobject = createEvent<GeoObject | null>();
sample({ clock: setSelectedGeoobject, target: $selectedGeoobject });

// При обоновлении геообьектов ищем среди них наш с обновленными данными
sample({
    clock: geoObjectModel.$geoObjects,
    source: $selectedGeoobject,
    fn: (selectedGeoobject, newObjects) => newObjects.find(({ id }) => selectedGeoobject!.id === id) || null,
    target: $selectedGeoobject,
});

export const mapObjectsModel = {
    $selectedGeoobject,
    setSelectedGeoobject,
};
