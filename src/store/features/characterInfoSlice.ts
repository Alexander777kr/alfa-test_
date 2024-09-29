import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type Character } from "./charactersTypes";
import axiosInstance from "../../api/axiosInstance";
import { CharacterInfoState } from "./characterInfoTypes";
import type { RootState } from '../store';

const initialState: CharacterInfoState = {
  characterInfo: {},
  status: 'idle',
  error: null
};

export const fetchCharacters = createAsyncThunk<
  Character,
  string,
  { rejectValue: string }
>(
  'character/fetchCharacterInfo',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`https://rickandmortyapi.com/api/character/${id}`);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action: PayloadAction<Character>) => {
        state.status = 'succeeded';
        state.characterInfo = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch characters';
      });
  },
});

export const selectCharacter = (state: RootState) => state.characterInfo;

export default characterInfoSlice.reducer;