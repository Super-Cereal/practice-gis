import type { Map } from 'leaflet';
import { createStore, createEvent, sample } from 'effector';

import type { MapMode, Aspect } from './types';

const $map = createStore<Map | null>(null);
const setMap = createEvent<Map>();
sample({ clock: setMap, target: $map });

const $mapMode = createStore<MapMode>('view');
const setMapMode = createEvent<MapMode>();
sample({ clock: setMapMode, target: $mapMode });

const $mapAspect = createStore<Aspect | null>(null);
const setMapAspect = createEvent<Aspect | null>();
sample({ clock: setMapAspect, target: $mapAspect });

export const mapModel = {
    $map,
    setMap,

    $mapMode,
    setMapMode,

    $mapAspect,
    setMapAspect,
};
