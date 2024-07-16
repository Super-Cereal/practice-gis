import { createStore, createEvent, createEffect } from 'effector';
import { status } from 'patronum/status';

import { getGeoObjectsRequest, saveGeoObjectRequest, updateGeoObjectRequest } from '../api/requests';
import type { GeoObject } from './types';

// Запрос за всеми геообьектами
const getGeoObjectsFx = createEffect(getGeoObjectsRequest);
const $getGeoObjectsLoading = status({ effect: getGeoObjectsFx, defaultValue: 'pending' });

// Сохранить геообьект в бэк
const saveGeoObjectFx = createEffect(saveGeoObjectRequest);
const $saveGeoObjectLoading = status(saveGeoObjectFx);

// Обновить геообьект в бэк
const updateGeoObjectFx = createEffect(updateGeoObjectRequest);
const $updateGeoObjectLoading = status(updateGeoObjectFx);

// Создаем стор
const $geoObjects = createStore<GeoObject[]>([]).on(getGeoObjectsFx.doneData, (_, geoObjects) => geoObjects);

export const geoObjectModel = {
    $geoObjects,

    $getGeoObjectsLoading,
    getGeoObjectsFx,

    $saveGeoObjectLoading,
    saveGeoObjectFx,

    $updateGeoObjectLoading,
    updateGeoObjectFx,
};
