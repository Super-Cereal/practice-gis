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

// Создаем стор для выбранного геообъекта ID
const $selectedGeoObjectId = createStore<string | null>(null);
const setSelectedGeoObjectId = createEvent<string | null>();
sample({ clock: setSelectedGeoObject, target: $selectedGeoObject });

//form
const $isGeoObjectModalOpen = createStore(false);
const setIsGeoObjectModalOpen = createEvent<boolean>();
sample({ clock: setIsGeoObjectModalOpen, target: $isGeoObjectModalOpen });

//form update
const $isUpdateModalOpen = createStore(false);
const setIsUpdateModalOpen = createEvent<boolean>();
sample({ clock: setIsUpdateModalOpen, target: $isUpdateModalOpen });

//form update
const $isChildModalOpen = createStore(false);
const setIsChildModalOpen = createEvent<boolean>();
sample({ clock: setIsChildModalOpen, target: $isChildModalOpen });

//classifier
const $isClassifierFormOpen = createStore(false);
const setIsClassifierFormOpen = createEvent<boolean>();
sample({ clock: setIsClassifierFormOpen, target: $isClassifierFormOpen });

//topology
const $isTopologyFormOpen = createStore(false);
const setIsTopologyFormOpen = createEvent<boolean>();
sample({ clock: setIsTopologyFormOpen, target: $isTopologyFormOpen });

//aspects
const $isAssignAspectModalOpen = createStore(false);
const setIsAssignAspectModalOpen = createEvent<boolean>();
sample({ clock: setIsAssignAspectModalOpen, target: $isAssignAspectModalOpen });

export const geoObjectFormModel = {
    $selectedEditorObject,
    setSelectedEditorObject,

    $selectedGeoObject,
    setSelectedGeoObject,

    $isGeoObjectModalOpen,
    setIsGeoObjectModalOpen,

    $isUpdateModalOpen,
    setIsUpdateModalOpen,

    $isChildModalOpen,
    setIsChildModalOpen,

    $isClassifierFormOpen,
    setIsClassifierFormOpen,

    $isTopologyFormOpen,
    setIsTopologyFormOpen,

    $isAssignAspectModalOpen,
    setIsAssignAspectModalOpen,
};
