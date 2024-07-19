import { createStore, createEvent, sample } from 'effector';

import type { GeoObject } from '../../../entities/geoobject';
import type { EditorObject } from '../../map-editor';

// Создаем стор для выбранного черновика
const $selectedEditorObject = createStore<EditorObject | null>(null);
const setSelectedEditorObject = createEvent<EditorObject | null>();
sample({ clock: setSelectedEditorObject, target: $selectedEditorObject });

// Создаем стор для выбранного геообъекта
const $selectedGeoObject = createStore<GeoObject | null>(null);
const setSelectedGeoObject = createEvent<GeoObject | null>();
sample({ clock: setSelectedGeoObject, target: $selectedGeoObject });

//form
const $isGeoObjectModalOpen = createStore(false);
const setIsGeoObjectModalOpen = createEvent<boolean>();
sample({ clock: setIsGeoObjectModalOpen, target: $isGeoObjectModalOpen });

//aspects list
const $isAspectsModalOpen = createStore(false);
const setIsAspectsModalOpen = createEvent<boolean>();
sample({ clock: setIsAspectsModalOpen, target: $isAspectsModalOpen });

export const geoObjectFormModel = {
    $selectedEditorObject,
    setSelectedEditorObject,

    $selectedGeoObject,
    setSelectedGeoObject,

    $isGeoObjectModalOpen,
    setIsGeoObjectModalOpen,

    $isAspectsModalOpen,
    setIsAspectsModalOpen,
};
