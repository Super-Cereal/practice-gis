import { createEvent, createStore } from 'effector';

const setIsGeoObjectModalOpenTrue = createEvent<void>();
const setIsGeoObjectModalOpenFalse = createEvent<void>();

const $isGeoObjectModalOpen = createStore<boolean>(false)
    .on(setIsGeoObjectModalOpenTrue, () => true)
    .on(setIsGeoObjectModalOpenFalse, () => false);

export const editorModal = {
    $isGeoObjectModalOpen,
    setIsGeoObjectModalOpenTrue,
    setIsGeoObjectModalOpenFalse,
};
