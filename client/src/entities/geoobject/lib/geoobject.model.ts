import { createStore, sample, createEffect, createEvent } from 'effector';
import { status } from 'patronum/status';
import { debounce } from 'patronum/debounce';

import { deleteGeoObjectRequest, getGeoObjectsRequest, saveGeoObjectRequest, updateGeoObjectRequest } from '../api/requests';
import type { GeoObject } from './types';

// Создаем стор
const $geoObjects = createStore<GeoObject[]>([]);

// Запрос за всеми геообьектами
const getGeoObjects = createEvent();
const getGeoObjectsFx = createEffect(getGeoObjectsRequest);
const $getGeoObjectsLoading = status({ effect: getGeoObjectsFx });

sample({
    clock: getGeoObjects,
    source: $getGeoObjectsLoading,
    filter: (loading) => loading !== 'pending',
    target: getGeoObjectsFx,
});

sample({ clock: getGeoObjectsFx.doneData, target: $geoObjects });

// Сохранить геообьект в бэк
const saveGeoObjectFx = createEffect(saveGeoObjectRequest);
const $saveGeoObjectLoading = status(saveGeoObjectFx);

// Перезапрашиваем геообьекты после сохранения
sample({ clock: saveGeoObjectFx.doneData, target: getGeoObjectsFx });

// Обновить геообьект в бэк
const updateGeoObjectFx = createEffect(updateGeoObjectRequest);
const $updateGeoObjectLoading = status(updateGeoObjectFx);

// Удалить геообьект в бэк
const deleteGeoObjectFx = createEffect(deleteGeoObjectRequest);
const $deleteGeoObjectLoading = status(deleteGeoObjectFx);

export const geoObjectModel = {
    $geoObjects,

    $getGeoObjectsLoading,
    getGeoObjects,
    getGeoObjectsFx,

    $saveGeoObjectLoading,
    saveGeoObjectFx,

    $updateGeoObjectLoading,
    updateGeoObjectFx,

    $deleteGeoObjectLoading,
    deleteGeoObjectFx,
};
