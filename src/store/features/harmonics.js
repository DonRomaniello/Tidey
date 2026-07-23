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
  loaded: false,
  /*
  Constituents are prefetched per station and cached here, so markers can
  wait to appear until their data is ready and popups open instantly.
  cacheStatus[id] is 'loading', 'loaded', or 'error'.
  */
  cache: {},
  cacheStatus: {},
}


export const fetchHarmonics = createAsyncThunk(
  'harmonics/fetchHarmonics',
  (station) => {
    return axios
          .get(station.harmonicConstituents.self)
          .then((response) => response.data )
  },
  {
    condition: (station, { getState }) => {
      return !getState().harmonics.cacheStatus[station.id]
    },
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
    },
    selectStation: (state, action) => {
      state.harmonics = state.cache[action.payload] || []
      state.loaded = state.harmonics.length > 0
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchHarmonics.pending, (state, action) => {
      state.cacheStatus[action.meta.arg.id] = 'loading'
    })
    builder.addCase(fetchHarmonics.fulfilled, (state, action) => {
      const constituents = normalizeConstituents(action.payload)
      const id = action.meta.arg.id
      if (constituents.length > 0) {
        state.cache[id] = constituents
        state.cacheStatus[id] = 'loaded'
      } else {
        // Nothing to visualize; leave the marker off the map.
        state.cacheStatus[id] = 'error'
      }
    })
    builder.addCase(fetchHarmonics.rejected, (state, action) => {
      state.cacheStatus[action.meta.arg.id] = 'error'
    })
  },
})

export const { increment, decrement, wideToggle, setCanvasSize, selectStation } = harmonicsSlice.actions;

export default harmonicsSlice.reducer

