import { createEffect } from 'effector';

import { addParentChildLinkRequest, addTopologyRequest } from '../../api/topology';

const addParentChildLinkFx = createEffect(addParentChildLinkRequest);
const addTopologyFx = createEffect(addTopologyRequest);

export const topologyModel = { addParentChildLinkFx, addTopologyFx };
