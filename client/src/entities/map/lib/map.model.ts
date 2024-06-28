import type { Map } from 'leaflet';
import { createStore, createEvent, sample } from 'effector';

const $map = createStore<Map | null>(null);
const setMap = createEvent<Map>();

sample({ clock: setMap, target: setMap });

export const mapModel = {
    $map,
    setMap,
};
