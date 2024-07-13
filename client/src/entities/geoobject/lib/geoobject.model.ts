import { createStore, createEvent } from 'effector';
import { GeoInfo, GeoObject } from './types';


// Создаем действия
 const addGeoObjectEvent = createEvent<GeoObject>();
 const removeGeoObjectEvent = createEvent<number>();
 const setSelectedGeoObjectEvent = createEvent<GeoObject | null>();

// Создаем стор
 const $geoObjectsStore = createStore<GeoObject[]>([])
  .on(addGeoObjectEvent, (state, geoObject) => [...state, geoObject])
  .on(removeGeoObjectEvent, (state, id) => state.filter(geoObject => geoObject.id !== id));

// Создаем стор для выбранного геообъекта
 const $selectedGeoObjectStore = createStore<GeoObject | null>(null)
  .on(setSelectedGeoObjectEvent, (_, selectedGeoObject) => selectedGeoObject);

// Создаем производной стор для геоинформации выбранного геообъекта
 const $selectedGeoInfoStore = $selectedGeoObjectStore.map((selectedGeoObject): GeoInfo | null => {
  if (!selectedGeoObject || !selectedGeoObject.geoInfo) {
    return null;
  }
  return selectedGeoObject.geoInfo;
});

export const GeoModel = {
    $geoObjectsStore,
    addGeoObjectEvent,
    removeGeoObjectEvent,

    
    $selectedGeoObjectStore,
    setSelectedGeoObjectEvent,

    $selectedGeoInfoStore


}
