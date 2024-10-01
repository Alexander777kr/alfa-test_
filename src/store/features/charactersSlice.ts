import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { CharactersApiReceivedState, CharactersState } from './charactersTypes';
import axiosInstance from '../../api/axiosInstance';
import { AddCharacter, Character } from '../../utils/types';
import { episodesNumberArrayToUrls } from '../../utils/functions';
import { WritableDraft } from 'immer';

const initialState: CharactersState = {
  characters: [],
  status: 'idle',
  error: null
};

export const fetchCharacters = createAsyncThunk<
  CharactersApiReceivedState,
  void,
  { rejectValue: string }
>(
  'characters/fetchCharacters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('https://rickandmortyapi.com/api/character');
      return response.data;
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
    },
    addCharacter: (state, action: PayloadAction<AddCharacter>) => {
      let shallowCopyPayload = {...action.payload};
      shallowCopyPayload = {...shallowCopyPayload, origin: {name: shallowCopyPayload.originName!, url: ""}, location: {name: shallowCopyPayload.locationName!, url: "",}, 
      episode: episodesNumberArrayToUrls(shallowCopyPayload.episodes), url: '', created: new Date().toISOString(), like: false};
      delete shallowCopyPayload.locationName; 
      delete shallowCopyPayload.originName;

      state.characters.unshift(shallowCopyPayload  as WritableDraft<Character>);
    }
  },
    extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
        state.characters = [];
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action: PayloadAction<CharactersApiReceivedState>) => {
        state.status = 'succeeded';
        const receivedData = action.payload.results;
        const modifiedDataWithLike = receivedData.map(character => ({...character, like: false}));
        state.characters = modifiedDataWithLike;
        state.error = null;
      })
      .addCase(fetchCharacters.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch characters';
        state.characters = [];
      });
  },
});

export const { deleteCharacterById, likeCharacter, addCharacter } = charactersSlice.actions;

export const selectCharacters = (state: RootState) => state.characters;

export default charactersSlice.reducer;