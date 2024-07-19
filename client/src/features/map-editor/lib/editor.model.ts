import { createStore, sample, createEvent } from 'effector';
import { nanoid } from 'nanoid';

import type { EditorObject, EditorPoint } from './types';

const $objects = createStore<Record<EditorObject['_id'], EditorObject>>({});
const $selectedObjects = sample({
    clock: $objects,
    fn: (objects) => Object.values(objects).filter(({ selected }) => selected),
});

/** Добавить обьект по координатам */
const addObject = createEvent<Omit<EditorObject, '_id' | 'selected'>>();
sample({
    clock: addObject,
    source: $objects,
    fn: (objects, { type, coordinates }) => {
        // @ts-ignore
        const newObject: EditorObject = {
            _id: nanoid(),
            type,
            coordinates,
            selected: true,
        };

        return { ...objects, [newObject._id]: newObject };
    },
    target: $objects,
});

/** Добавить/убрать выделение обьекту по _id */
const toggleObjectSelect = createEvent<EditorObject['_id']>();
sample({
    clock: toggleObjectSelect,
    source: $objects,
    fn: (objects, _id) => {
        const object = objects[_id];

        return { ...objects, [object._id]: { ...object, selected: !object.selected } };
    },
    target: $objects,
});

/** Удалить обьект */
const deleteObject = createEvent<EditorObject['_id']>();
sample({
    clock: deleteObject,
    source: $objects,
    fn: (objects, _id) => {
        const copiedPoints = { ...objects };
        delete copiedPoints[_id];

        return copiedPoints;
    },
    target: $objects,
});

/** Обьединить выбранные точки в линию или полигон */
const unitePointsTo = createEvent<Exclude<EditorObject['type'], 'Point'>>();
sample({
    clock: unitePointsTo,
    source: $selectedObjects,
    fn: (selectedObjects, type) => {
        const selectedPoints = Object.values(selectedObjects).filter(
            (object): object is EditorPoint => object.type === 'Point',
        );

        return { type, coordinates: selectedPoints.map(({ coordinates }) => coordinates) };
    },
    target: addObject,
});

export const editorModel = {
    $objects,
    $selectedObjects,

    addObject,
    toggleObjectSelect,
    deleteObject,

    unitePointsTo,
};
