import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { editorReducer } from './editor.slice';
import { overlaysApi } from './overlays.api';

const rootReducer = combineReducers({
    editor: editorReducer,
    [overlaysApi.reducerPath]: overlaysApi.reducer,
});

const persistedReducer = rootReducer;

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(overlaysApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
