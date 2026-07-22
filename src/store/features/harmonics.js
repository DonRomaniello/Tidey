import {
  createAsyncThunk,
  createSlice,
 } from '@reduxjs/toolkit'

import axios from 'axios';

import constituentSpeeds from '../../constituentSpeeds.json'

/*
NOAA returns {HarmonicConstituents: [{amplitude, phase_GMT, speed}]}.
TICON-4 stations (via the Neaps tide database) return
{harmonic_constituents: [{name, amplitude, phase}]} — no speed, but
constituent speeds are universal constants, so they are looked up by name.
*/
const normalizeConstituents = (data) => {
  const constituents = data.HarmonicConstituents ||
    (data.harmonic_constituents || []).map((constituent) => ({
      ...constituent,
      phase_GMT: constituent.phase,
      speed: constituentSpeeds[constituent.name.toUpperCase()],
    }))
  return constituents
    .filter((constituent) => (constituent.amplitude > 0) && (constituent.speed > 0))
    .sort((a, b) => b.amplitude - a.amplitude)
}

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
      state.harmonics = normalizeConstituents(action.payload)
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

