import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from 'immer';
import { AddCharacter, Character } from "../../utils/types";
import axiosInstance from "../../api/axiosInstance";
import { CharacterInfoState } from "./characterInfoTypes";
import type { RootState } from '../store';
import { episodesNumberArrayToUrls } from "../../utils/functions";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiCharacter = import.meta.env.VITE_API_CHARACTER;

const initialState: CharacterInfoState = {
  characterInfo: {} as Character,
  status: 'idle',
  error: null
};

export const fetchCharacterInfo = createAsyncThunk<
  Character,
  string,
  { rejectValue: string }
>(
  'character/fetchCharacterInfo',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${baseUrl}${apiCharacter}/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

const characterInfoSlice = createSlice({
  name: 'characterInfo',
  initialState,
  reducers: {
    addCharacterDetailedInfo: (state, action: PayloadAction<AddCharacter>) => {
      let shallowCopyPayload = {...action.payload};
      shallowCopyPayload = {...shallowCopyPayload, origin: {name: shallowCopyPayload.originName!, url: ""}, location: {name: shallowCopyPayload.locationName!, url: "",}, 
      episode: episodesNumberArrayToUrls(shallowCopyPayload.episodes), url: '', created: new Date().toISOString(), like: false};
      delete shallowCopyPayload.locationName; 
      delete shallowCopyPayload.originName;

      state.characterInfo = shallowCopyPayload  as WritableDraft<Character>;
      state.status = 'succeeded';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterInfo.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.characterInfo = {} as Character;
      })
      .addCase(fetchCharacterInfo.fulfilled, (state, action: PayloadAction<Character>) => {
        state.status = 'succeeded';
        state.error = null;
        state.characterInfo = action.payload;
      })
      .addCase(fetchCharacterInfo.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch character info';
        state.characterInfo = {} as Character;
      });
  },
});

export const { addCharacterDetailedInfo } = characterInfoSlice.actions;

export const selectCharacter = (state: RootState) => state.characterInfo;

export default characterInfoSlice.reducer;