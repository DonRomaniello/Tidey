import {
  createAsyncThunk,
  createSlice,
 } from '@reduxjs/toolkit'

import axios from 'axios';

const initialState = {
  stations: [],
  noaaStations: [],
  worldStations: [],
  selected: 0,
  loading: false,
  error: '',
}

// Worldwide (non-US) stations come from the TICON-4 dataset, republished as
// individual JSON files by the Neaps tide database and served from jsDelivr.
const WORLD_STATION_BASE = 'https://cdn.jsdelivr.net/gh/neaps/tide-database@main/data/ticon/'

export const fetchStations = createAsyncThunk(
  'stations/fetchStations',
  () => {
    return axios
          .get('https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=harcon')
          .then((response) => response.data )
  }
)

export const fetchWorldStations = createAsyncThunk(
  'stations/fetchWorldStations',
  () => {
    return axios
          .get(process.env.PUBLIC_URL + '/data/worldStations.json')
          .then((response) => response.data )
  }
)

const mergeStations = (state) => {
  state.stations = [...state.noaaStations, ...state.worldStations].sort((a, b) => a.lng - b.lng)
}

export const stationsSlice = createSlice({
  name: 'stations',
  initialState,
  reducers: {
    updateSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchStations.pending, state => {
      state.loading = true;
    })
    builder.addCase(fetchStations.fulfilled, (state, action) => {
      state.loading = false
      state.noaaStations = action.payload.stations.filter(stn => ((stn.lat != null) && (stn.lng != null) && stn.id))
      state.error = ''
      mergeStations(state)
    })
    builder.addCase(fetchStations.rejected, (state, action) => {
      state.loading = false
      state.noaaStations = []
      state.error = action.error.message
      mergeStations(state)
    })
    builder.addCase(fetchWorldStations.fulfilled, (state, action) => {
      state.worldStations = action.payload.map((stn) => ({
        id: stn.id,
        lat: stn.lat,
        lng: stn.lng,
        harmonicConstituents: { self: WORLD_STATION_BASE + stn.id + '.json' },
      }))
      mergeStations(state)
    })
    builder.addCase(fetchWorldStations.rejected, (state) => {
      // The map still works with NOAA stations only.
      state.worldStations = []
      mergeStations(state)
    })
  },
})

export const { updateSelected } = stationsSlice.actions;

export default stationsSlice.reducer
