import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './features/charactersSlice';
import characterInfoReducer from './features/characterInfoSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    characterInfo: characterInfoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;