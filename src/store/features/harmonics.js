import {
  createAsyncThunk,
  createSlice,
 } from '@reduxjs/toolkit'

import axios from 'axios';

const initialState = {
  harmonics: [],
  shownConstituents: 3,
  loading: false,
  loaded: false,
  error: '',
}


export const fetchHarmonics = createAsyncThunk(
  'harmonics/fetchHarmonics',
  (harmonicsUrl) => {
    return axios
          .get(harmonicsUrl.self)
          .then((response) => response.data )
  }
)

export const harmonicsSlice = createSlice({
  name: 'harmonics',
  initialState,
  reducers: {
    increment: (state) => {
      if (state.shownConstituents < 20){
        state.shownConstituents += 1;
      }
    },
    decrement: state => {
      if (state.shownConstituents > 1){
        state.shownConstituents -= 1
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchHarmonics.pending, state => {
      state.loading = true;
      state.loaded = false;
    })
    builder.addCase(fetchHarmonics.fulfilled, (state, action) => {
      state.loading = false
      state.harmonics = action.payload.HarmonicConstituents
      state.loaded = true
      state.error = ''
    })
    builder.addCase(fetchHarmonics.rejected, (state, action) => {
      state.loading = false
      state.harmonics = []
      state.loaded = false
      state.error = action.error.message
    })
  },
})

export const { increment, decrement } = harmonicsSlice.actions;

export default harmonicsSlice.reducer

