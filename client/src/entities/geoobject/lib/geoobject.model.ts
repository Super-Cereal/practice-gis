import { createStore, createEvent } from 'effector';
import { GeoInfo, GeoObject } from './types';


// Создаем действия
 const addGeoObjectEvent = createEvent<GeoObject>();
 const removeGeoObjectEvent = createEvent<string>();
 const setSelectedGeoObjectEvent = createEvent<GeoObject | null>();
 const setSelectedObjectEvent = createEvent<{ type: string; id: string } | null>();

// Создаем стор
 const $geoObjectsStore = createStore<GeoObject[]>([])
  .on(addGeoObjectEvent, (state, geoObject) => [...state, geoObject])
  .on(removeGeoObjectEvent, (state, id) => state.filter(geoObject => geoObject.id !== id));

  // Создаем стор для выбранного объекта для создания геообъекта ( точка. линия или полигон)
  const $selectedObjectStore = createStore<{ type: string; id: string } | null>(null)
  .on(setSelectedObjectEvent, (_, selectedObject) => selectedObject);

// Создаем стор для выбранного геообъекта
 const $selectedGeoObjectStore = createStore<GeoObject | null>(null)
  .on(setSelectedGeoObjectEvent, (_, selectedGeoObject) => selectedGeoObject);

// Создаем производной стор для геоинформации выбранного геообъекта
 const $selectedGeoInfoStore = $selectedGeoObjectStore.map((selectedGeoObject): GeoInfo | null => {
  return selectedGeoObject?.geoInfo || null;
});

export const GeoModel = {
  $selectedObjectStore,
  setSelectedObjectEvent,

    $geoObjectsStore,
    addGeoObjectEvent,
    removeGeoObjectEvent,

    
    $selectedGeoObjectStore,
    setSelectedGeoObjectEvent,

    $selectedGeoInfoStore


}
