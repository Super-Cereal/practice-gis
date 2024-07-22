import { createStore, createEvent, sample, createEffect } from 'effector';

import { createAspectRequest, getAspectsRequest, assignAspectRequest } from '../../api/aspects';
import type { AssignedAspect, DraftAspect } from './types';

/** Привязки аспектов к обьектам */
const $assignedAspects = createStore<AssignedAspect[]>([]);

const getAspectsFx = createEffect(getAspectsRequest);
sample({ clock: getAspectsFx.doneData, target: $assignedAspects });

const createAspectFx = createEffect(createAspectRequest);
const assignAspectFx = createEffect(assignAspectRequest);
sample({ clock: [createAspectFx.done, assignAspectFx.done], target: getAspectsFx });

/** Инфа об аспектах для карты и формы */
const $uniqueAspects = createStore<DraftAspect[]>([]);
sample({
    clock: $assignedAspects,
    fn: (assignedAspects) => {
        const uniqueAspects: Record<AssignedAspect['code'], DraftAspect> = {};

        assignedAspects.forEach(({ code, type, commonInfo }) => {
            uniqueAspects[code] = { code, type, commonInfo };
        });

        return Object.values(uniqueAspects);
    },
    target: $uniqueAspects,
});

const $isNewAspectModalOpen = createStore(false);
const setIsNewAspectModalOpen = createEvent<boolean>();
sample({ clock: setIsNewAspectModalOpen, target: $isNewAspectModalOpen });

export const aspectsModel = {
    $assignedAspects,
    getAspectsFx,

    createAspectFx,
    assignAspectFx,

    $uniqueAspects,

    $isNewAspectModalOpen,
    setIsNewAspectModalOpen,
};
