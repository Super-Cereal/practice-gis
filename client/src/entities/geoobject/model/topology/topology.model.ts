import { createEffect, createEvent, createStore, sample } from 'effector';
import { status } from 'patronum';

import {
    getParentChildLinksRequest,
    addParentChildLinkRequest,
    getTopologiesRequest,
    addTopologyRequest,
} from '../../api/topology';

import type { ParentChildObjectLink, TopologyLink } from './types';

//стор для родительских связей
const $parentChildLinks = createStore<ParentChildObjectLink[]>([]);

// Запрос за всеми связями родитель-ребенок
const getParentChildLinks = createEvent<void>();
const getParentChildLinksFx = createEffect(getParentChildLinksRequest);
const $getParentChildLinksLoading = status({ effect: getParentChildLinksFx });

sample({
    clock: getParentChildLinks,
    source: $getParentChildLinksLoading,
    filter: (loading) => loading !== 'pending',
    target: getParentChildLinksFx,
});

sample({ clock: getParentChildLinksFx.doneData, target: $parentChildLinks });

//добавить родитель-ребенок связь
const addParentChildLinkFx = createEffect(addParentChildLinkRequest);

const $topologies = createStore<TopologyLink[]>([]);

// Запрос за всеми топологиями
const getTopologies = createEvent<void>();
const getTopologiesFx = createEffect(getTopologiesRequest);
const $getTopologiesLoading = status({ effect: getParentChildLinksFx });

sample({
    clock: getTopologies,
    source: $getTopologiesLoading,
    filter: (loading) => loading !== 'pending',
    target: getTopologiesFx,
});
sample({ clock: getTopologiesFx.doneData, target: $topologies });

// добавить топологическую связь
const addTopologyFx = createEffect(addTopologyRequest);
sample({ clock: addTopologyFx.done, target: getTopologies });

export const topologyModel = {
    $parentChildLinks,
    getParentChildLinks,
    addParentChildLinkFx,

    $topologies,
    getTopologies,
    addTopologyFx,
};
