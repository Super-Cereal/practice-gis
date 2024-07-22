import { createEvent, createStore, sample } from "effector";

const $showArchiveObjects = createStore(false);
const showArchiveObjectsChanged = createEvent<boolean>();

sample({
  clock: showArchiveObjectsChanged,
  target: $showArchiveObjects,
});

export const infoPlateModel ={
    $showArchiveObjects,
    showArchiveObjectsChanged
}