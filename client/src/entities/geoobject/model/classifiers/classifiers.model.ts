import { createStore, sample, createEffect, createEvent } from 'effector';
import { status } from 'patronum/status';

import { getClassifiersRequest, saveClassifierRequest, addGeoObjectClassifierRequest } from '../../api/classifiers';

import type { Classifier } from './types';

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

// Создать классификатор
const saveClassifierFx = createEffect(saveClassifierRequest);
const $saveClassifierLoading = status(saveClassifierFx);

sample({ clock: saveClassifierFx.doneData, target: getClassifiersFx });

// модальное окно для создания нового класса
const $isNewClassModalOpen = createStore(false);
const setIsNewClassModalOpen = createEvent<boolean>();
sample({ clock: setIsNewClassModalOpen, target: $isNewClassModalOpen });

// Добавить классификатор геообьекту
const addGeoObjectClassifierFx = createEffect(addGeoObjectClassifierRequest);

export const classifiersModel = {
    $classifiers,

    $getClassifiersLoading,
    getClassifiers,
    getClassifiersFx,

    $saveClassifierLoading,
    saveClassifierFx,

    $GeoObjectclassifiers,

    $isNewClassModalOpen,
    setIsNewClassModalOpen,

    addGeoObjectClassifierFx,
};
