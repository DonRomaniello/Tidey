import {
  createAsyncThunk,
  createSlice,
 } from '@reduxjs/toolkit'

import axios from 'axios';

const initialState = {
  stations: [],
  loading: false,
  error: '',
}


export const fetchStations = createAsyncThunk(
  'stations/fetchStations',
  () => {
    return axios
          .get('https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions')
          .then((response) => response.data )
          .finally((response) => console.log(response))
  }
)



export const stationsSlice = createSlice({
  name: 'stations',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchStations.pending, state => {
      state.loading = true;
    })
    builder.addCase(fetchStations.fulfilled, (state, action) => {
      state.loading = false
      state.stations = action.payload.stations
      state.error = ''
    })
    builder.addCase(fetchStations.rejected, (state, action) => {
      state.loading = false
      state.stations = []
      state.error = action.error.message
    })
  },
})

export default stationsSlice.reducer

