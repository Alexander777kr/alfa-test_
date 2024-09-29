import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../../utils/types";
import axiosInstance from "../../api/axiosInstance";
import { CharacterInfoState } from "./characterInfoTypes";
import type { RootState } from '../store';

const initialState: CharacterInfoState = {
  characterInfo: {},
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
      .addCase(fetchCharacterInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacterInfo.fulfilled, (state, action: PayloadAction<Character>) => {
        state.status = 'succeeded';
        state.characterInfo = action.payload;
      })
      .addCase(fetchCharacterInfo.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch character info';
      });
  },
});

export const selectCharacter = (state: RootState) => state.characterInfo;

export default characterInfoSlice.reducer;