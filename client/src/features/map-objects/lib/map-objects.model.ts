import { createStore, createEvent, sample } from 'effector';
import { geoObjectModel, type GeoObject } from '../../../entities/geoobject';

// Хранилище для нескольких выбранных геообъектов
const $selectedGeoobjects = createStore<GeoObject[]>([]);

// Событие для установки выбранных геообъектов
const setSelectedGeoobjects = createEvent<GeoObject[]>();

// Событие для добавления одного геообъекта к выбранным
const addSelectedGeoobject = createEvent<GeoObject>();

// Событие для удаления одного геообъекта из выбранных
const removeSelectedGeoobject = createEvent<GeoObject>();

// Событие для установки текущего приближенного объекта
const setZoomedObject = createEvent<GeoObject | null>();
const triggerZoom = createEvent(); // Событие для повторного вызова зума

// Хранилище для текущего приближенного объекта
const $zoomedObject = createStore<GeoObject | null>(null);

// Хранилище для отслеживания времени последнего зума
const $zoomedObjectTimestamp = createStore<number>(0);

// Обработка установки выбранных геообъектов
sample({
    clock: setSelectedGeoobjects,
    target: $selectedGeoobjects,
});

// Обработка добавления одного геообъекта к выбранным
sample({
    clock: addSelectedGeoobject,
    source: $selectedGeoobjects,
    fn: (selectedGeoobjects, newGeoobject) => {
        if (!selectedGeoobjects.some((geo) => geo.id === newGeoobject.id)) {
            console.log('addSelectedGeoobject' + newGeoobject);
            return [...selectedGeoobjects, newGeoobject];
        }
        return selectedGeoobjects;
    },
    target: $selectedGeoobjects,
});

// Обработка удаления одного геообъекта из выбранных
sample({
    clock: removeSelectedGeoobject,
    source: $selectedGeoobjects,
    fn: (selectedGeoobjects, geoobjectToRemove) => {
        console.log('removeSelectedGeoobject' + geoobjectToRemove);
        return selectedGeoobjects.filter((geo) => geo.id !== geoobjectToRemove.id);
    },
    target: $selectedGeoobjects,
});

// При обновлении геообъектов ищем среди них наши с обновленными данными
sample({
    clock: geoObjectModel.$geoObjects,
    source: $selectedGeoobjects,
    fn: (selectedGeoobjects, newObjects) => {
        return selectedGeoobjects.map(
            (selectedGeoobject) => newObjects.find(({ id }) => selectedGeoobject.id === id) || selectedGeoobject,
        );
    },
    target: $selectedGeoobjects,
});

// Обработка установки текущего приближенного объекта
sample({
    clock: setZoomedObject,
    target: $zoomedObject,
});
// Обновляем время последнего зума при любом изменении зума
sample({
    clock: [setZoomedObject, triggerZoom],
    fn: () => Date.now(),
    target: $zoomedObjectTimestamp,
});

export const mapObjectsModel = {
    $selectedGeoobjects,
    setSelectedGeoobjects,
    addSelectedGeoobject,
    removeSelectedGeoobject,

    $zoomedObject,
    setZoomedObject,
    triggerZoom,
    $zoomedObjectTimestamp,
};
