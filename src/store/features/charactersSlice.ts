import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { CharactersArray, CharactersState } from './charactersTypes';
import axiosInstance from '../../api/axiosInstance';

const initialState: CharactersState = {
  characters: [],
  status: 'idle',
  error: null
};

export const fetchCharacters = createAsyncThunk<
  CharactersArray,
  void,
  { rejectValue: string }
>(
  'characters/fetchCharacters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('https://rickandmortyapi.com/api/character');
      return response.data.results;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);



const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    deleteCharacterById: (state, action: PayloadAction<number>) => {
      const index = state.characters.findIndex(character => character.id === action.payload);
      if (index !== -1) {
      state.characters.splice(index, 1);
      }
    },
    likeCharacter: (state, action: PayloadAction<number>) => {
      const index = state.characters.findIndex(character => character.id === action.payload);
      if (index !== -1) {
          state.characters[index].like = !state.characters[index].like;
      }
    }
  },
    extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action: PayloadAction<CharactersArray>) => {
        state.status = 'succeeded';
        const receivedData = action.payload;
        const modifiedDataWithLike = receivedData.map(character => ({...character, like: false}));
        state.characters = modifiedDataWithLike; // Добавляем персонажей в store
      })
      .addCase(fetchCharacters.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch characters';
      });
  },
});

export const { deleteCharacterById, likeCharacter } = charactersSlice.actions;

export const selectCharacters = (state: RootState) => state.characters;

export default charactersSlice.reducer;