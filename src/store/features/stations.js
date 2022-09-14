import {
  createAsyncThunk,
  createSlice,
 } from '@reduxjs/toolkit'

import axios from 'axios';

const initialState = {
  stations: [],
  selected: 0,
  loading: false,
  error: '',
}


export const fetchStations = createAsyncThunk(
  'stations/fetchStations',
  () => {
    return axios
          .get('https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=harcon')
          .then((response) => response.data )
  }
)

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
      state.stations = action.payload.stations.filter(stn => ((stn.lat & stn.lng & stn.id))).sort((a, b) => a.lng - b.lng)
      state.error = ''
    })
    builder.addCase(fetchStations.rejected, (state, action) => {
      state.loading = false
      state.stations = []
      state.error = action.error.message
    })
  },
})

export const { updateSelected } = stationsSlice.actions;

export default stationsSlice.reducer

