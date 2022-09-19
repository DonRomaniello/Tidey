import {
  createAsyncThunk,
  createSlice,
 } from '@reduxjs/toolkit'

import axios from 'axios';

const initialState = {
  harmonics: [],
  shownNumber: 4,
  canvasSize: [200, 400],
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
      if (state.shownNumber < 20){
        state.shownNumber += 1;
      }
    },
    decrement: (state) => {
      if (state.shownNumber > 0){
        state.shownNumber -= 1
      }
    },
    wideToggle: (state) => {
      state.wide = !state.wide;
    },
    setCanvasSize: (state, action) => {
      state.canvasSize = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchHarmonics.pending, state => {
      state.loading = true;
      state.loaded = false;
    })
    builder.addCase(fetchHarmonics.fulfilled, (state, action) => {
      state.loading = false
      state.harmonics = action.payload.HarmonicConstituents.sort((a, b) => b.amplitude - a.amplitude)
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

export const { increment, decrement, wideToggle, setCanvasSize } = harmonicsSlice.actions;

export default harmonicsSlice.reducer

