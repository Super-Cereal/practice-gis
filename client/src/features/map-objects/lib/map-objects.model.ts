import { createStore, createEvent, sample } from 'effector';

import type { GeoObject } from '../../../entities/geoobject';

const $selectedGeoobject = createStore<GeoObject | null>(null);
const setSelectedGeoobject = createEvent<GeoObject | null>();
sample({ clock: setSelectedGeoobject, target: $selectedGeoobject });

export const mapObjectsModel = {
    $selectedGeoobject,
    setSelectedGeoobject,
};
