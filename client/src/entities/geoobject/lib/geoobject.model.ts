import { createStore, sample, createEffect, createEvent } from 'effector';
import { status } from 'patronum/status';
import { debounce } from 'patronum/debounce';

import {
    deleteGeoObjectRequest,
    getGeoObjectsRequest,
    saveGeoObjectRequest,
    updateGeoObjectRequest,
    getClassifiersRequest,
    saveClassifierRequest,
    addGeoObjectClassifierRequest,
} from '../api/requests';
import type { GeoObject } from './types';
import type { Classifier } from './types';
import type { GeoObjectsClassifier } from './types';

// Создаем стор
const $geoObjects = createStore<GeoObject[]>([]);

// стоит перенести классы и аспекты в отдельный стор?
const $classifiers = createStore<Classifier[]>([]);


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

// Запрос за всеми классификаторами
const getClassifiers = createEvent();
const getClassifiersFx = createEffect(getClassifiersRequest);
const $getClassifiersLoading = status({ effect: getClassifiersFx });

sample({
    clock: getClassifiers,
    source: $getClassifiersLoading,
    filter: (loading) => loading !== 'pending',
    target: getClassifiersFx,
});

sample({ clock: getClassifiersFx.doneData, target: $classifiers });

// Создать классификатор
const saveClassifierFx = createEffect(saveClassifierRequest);
const $saveClassifierLoading = status(saveClassifierFx);

sample({ clock: saveClassifierFx.doneData, target: getClassifiersFx });

// Добавить классификатор геообьекту
const addGeoObjectClassifierFx = createEffect<GeoObjectsClassifier, GeoObjectsClassifier>(({ geoObjectId, classifierId }) =>
    addGeoObjectClassifierRequest({ geoObjectId, classifierId })
  );
  
const $addGeoObjectClassifierLoading = status(addGeoObjectClassifierFx);


export const geoObjectModel = {
    $geoObjects,
    $classifiers,

    $getGeoObjectsLoading,
    getGeoObjects,
    getGeoObjectsFx,

    $saveGeoObjectLoading,
    saveGeoObjectFx,

    $updateGeoObjectLoading,
    updateGeoObjectFx,

    $deleteGeoObjectLoading,
    deleteGeoObjectFx,

    $getClassifiersLoading,
    getClassifiers,
    getClassifiersFx,

    $saveClassifierLoading,
    saveClassifierFx,

    $addGeoObjectClassifierLoading,
    addGeoObjectClassifierFx,
};
