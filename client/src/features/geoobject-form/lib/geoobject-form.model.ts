import { createStore, createEvent } from 'effector';

import type { GeoObject } from '../../../entities/geoobject';

// Создаем действия
const setSelectedGeoObjectEvent = createEvent<GeoObject | null>();
const setSelectedObjectEvent = createEvent<{ type: string; id: string } | null>();

// Создаем стор для выбранного объекта для создания геообъекта ( точка. линия или полигон)
const $selectedObjectStore = createStore<{ type: string; id: string } | null>(null).on(
    setSelectedObjectEvent,
    (_, selectedObject) => selectedObject,
);

// Создаем стор для выбранного геообъекта
const $selectedGeoObjectStore = createStore<GeoObject | null>(null).on(
    setSelectedGeoObjectEvent,
    (_, selectedGeoObject) => selectedGeoObject,
);

export const geoObjectFormModel = {
    $selectedGeoObjectStore,
    setSelectedGeoObjectEvent,

    setSelectedObjectEvent,
    $selectedObjectStore,
};
