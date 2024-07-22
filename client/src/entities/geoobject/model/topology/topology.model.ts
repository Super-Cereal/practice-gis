import { createEffect, createEvent, createStore, sample } from 'effector';

import { addParentChildLinkRequest, addTopologyRequest, getParentChildLinksRequest } from '../../api/topology';
import { ParentChildObjectLink } from '../types';
import { status } from 'patronum';

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
// добавить топологическую связь
const addTopologyFx = createEffect(addTopologyRequest);


export const topologyModel = {
  addParentChildLinkFx,
  addTopologyFx,
  getParentChildLinksFx,
  $parentChildLinks,
};