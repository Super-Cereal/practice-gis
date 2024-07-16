import { createStore, createEvent, createEffect } from 'effector';
import { status } from 'patronum/status';

import { getGeoObjectsRequest } from '../api/getGeoObjectsRequest';
import type { GeoInfo, GeoObject } from './types';

// Создаем действия
const addGeoObjectEvent = createEvent<GeoObject>();
const removeGeoObjectEvent = createEvent<string>();
const setSelectedGeoObjectEvent = createEvent<GeoObject | null>();
const setSelectedObjectEvent = createEvent<{ type: string; id: string } | null>();

// Запрос за всеми геообьектами
const getGeoObjectsFx = createEffect(getGeoObjectsRequest);
const $getGeoObjectsLoading = status({ effect: getGeoObjectsFx, defaultValue: 'pending' });

// Создаем стор
const $geoObjectsStore = createStore<GeoObject[]>([])
    .on(addGeoObjectEvent, (state, geoObject) => [...state, geoObject])
    .on(removeGeoObjectEvent, (state, id) => state.filter((geoObject) => geoObject.id !== id))
    .on(getGeoObjectsFx.doneData, (_, geoObjects) => geoObjects);

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

// Создаем производной стор для геоинформации выбранного геообъекта
const $selectedGeoInfoStore = $selectedGeoObjectStore.map((selectedGeoObject): GeoInfo | null => {
    return selectedGeoObject?.geoInfo || null;
});

export const GeoModel = {
    $getGeoObjectsLoading,
    getGeoObjectsFx,

    $selectedObjectStore,
    setSelectedObjectEvent,

    $geoObjectsStore,
    addGeoObjectEvent,
    removeGeoObjectEvent,

    $selectedGeoObjectStore,
    setSelectedGeoObjectEvent,

    $selectedGeoInfoStore,
};
