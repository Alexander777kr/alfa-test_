import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { CharacterArray } from './charactersTypes';

const initialState: CharacterArray = [];

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
reducers: {
    setCharacters: (state, action: PayloadAction<CharacterArray>) => {
      return action.payload;
    },
  }
});

export const { setCharacters } = charactersSlice.actions;

export const selectCharacters = (state: RootState) => state.characters;

export default charactersSlice.reducer;