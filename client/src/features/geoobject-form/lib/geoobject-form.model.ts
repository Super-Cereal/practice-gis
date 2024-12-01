import { createStore, createEvent, sample } from 'effector';

import type { EditorObject } from '../../map-editor';
import { GeoObject } from '../../../entities/geoobject';

// СОСТОЯНИЕ ДЛЯ ВЫБРАННОГО ЧЕРНОВИКА В EDIT MODE  В

const $selectedEditorObject = createStore<EditorObject | null>(null);
const setSelectedEditorObject = createEvent<EditorObject | null>();
sample({ clock: setSelectedEditorObject, target: $selectedEditorObject });

// для вЫБРАННОГО ГЕОБЪЕТКА ДЛЯ РЕДАКТИРОВАНИЯ
const $selectedObjectToEdit = createStore<GeoObject | null>(null);
const setSelectedObjectToEdit = createEvent<GeoObject | null>();
sample({ clock: setSelectedObjectToEdit, target: $selectedObjectToEdit });

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

    $selectedObjectToEdit,
    setSelectedObjectToEdit,
};
