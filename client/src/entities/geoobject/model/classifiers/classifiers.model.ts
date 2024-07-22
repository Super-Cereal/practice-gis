import { createStore, sample, createEffect, createEvent } from 'effector';
import { status } from 'patronum/status';

import { getClassifiersRequest, saveClassifierRequest, addGeoObjectClassifierRequest, getGeoObjectClassifiersRequest } from '../../api/classifiers';

import type { Classifier, GeoObjectsClassifier } from './types';

const $classifiers = createStore<Classifier[]>([]);
const $GeoObjectclassifiers = createStore<string[]>([]);

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

// Запрос за классификаторами у объекта
const getGeoObjectClassifiers = createEvent<string>();
const getGeoObjectClassifiersFx = createEffect<string, string[]>(getGeoObjectClassifiersRequest);
const $getGeoObjectClassifiersLoading = status({ effect: getGeoObjectClassifiersFx });

sample({
    clock: getGeoObjectClassifiers,
    source: $getGeoObjectClassifiersLoading,
    filter: (loading) => loading !== 'pending',
    target: getGeoObjectClassifiersFx,
});

sample({
    clock: getGeoObjectClassifiersFx.doneData,
    target: $GeoObjectclassifiers,
});

// Создать классификатор
const saveClassifierFx = createEffect(saveClassifierRequest);
const $saveClassifierLoading = status(saveClassifierFx);

sample({ clock: saveClassifierFx.doneData, target: getClassifiersFx });



// модальное окно для создания нового класса
const $isNewClassModalOpen = createStore(false);
const setIsNewClassModalOpen = createEvent<boolean>();
sample({ clock: setIsNewClassModalOpen, target: $isNewClassModalOpen });

export const classifiersModel = {
    $classifiers,

    $getClassifiersLoading,
    getClassifiers,
    getClassifiersFx,

    $saveClassifierLoading,
    saveClassifierFx,

    getGeoObjectClassifiers,
    getGeoObjectClassifiersFx,
    $getGeoObjectClassifiersLoading,
    
    $GeoObjectclassifiers,

    $isNewClassModalOpen,
    setIsNewClassModalOpen


};
