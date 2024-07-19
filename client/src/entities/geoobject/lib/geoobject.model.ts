import { createStore, sample, createEffect } from 'effector';
import { status } from 'patronum/status';

import { getGeoObjectsRequest, saveGeoObjectRequest, updateGeoObjectRequest } from '../api/requests';
import type { GeoObject } from './types';

// Создаем стор
const $geoObjects = createStore<GeoObject[]>([]);

// Запрос за всеми геообьектами
const getGeoObjectsFx = createEffect(getGeoObjectsRequest);
const $getGeoObjectsLoading = status({ effect: getGeoObjectsFx, defaultValue: 'pending' });

sample({ clock: getGeoObjectsFx.doneData, target: $geoObjects });

// Сохранить геообьект в бэк
const saveGeoObjectFx = createEffect(saveGeoObjectRequest);
const $saveGeoObjectLoading = status(saveGeoObjectFx);

// Перезапрашиваем геообьекты после сохранения
sample({ clock: saveGeoObjectFx.doneData, target: getGeoObjectsFx });

// Обновить геообьект в бэк
const updateGeoObjectFx = createEffect(updateGeoObjectRequest);
const $updateGeoObjectLoading = status(updateGeoObjectFx);

export const geoObjectModel = {
    $geoObjects,

    $getGeoObjectsLoading,
    getGeoObjectsFx,

    $saveGeoObjectLoading,
    saveGeoObjectFx,

    $updateGeoObjectLoading,
    updateGeoObjectFx,
};
