import { createEvent, createStore } from 'effector';


//form
 const setIsGeoObjectModalOpenTrue = createEvent<void>();
 const setIsGeoObjectModalOpenFalse = createEvent<void>();

const $isGeoObjectModalOpen = createStore<boolean>(false)
    .on(setIsGeoObjectModalOpenTrue, () => true)
    .on(setIsGeoObjectModalOpenFalse, () => false);

//aspects list
    const setIsAspectsModalOpenTrue = createEvent<void>();
    const setIsAspectsModalOpenFalse = createEvent<void>();
   
   const $isAspectsModalOpen = createStore<boolean>(false)
       .on(setIsAspectsModalOpenTrue, () => true)
       .on(setIsAspectsModalOpenFalse, () => false);
   
    export const editorModal ={

        $isGeoObjectModalOpen,
        setIsGeoObjectModalOpenTrue,
        setIsGeoObjectModalOpenFalse,

        $isAspectsModalOpen,
        setIsAspectsModalOpenTrue,
        setIsAspectsModalOpenFalse

    }

