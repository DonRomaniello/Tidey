import {
  createAsyncThunk,
  createSlice,
 } from '@reduxjs/toolkit'

import axios from 'axios';

const initialState = {
  harmonics: [],
  loading: false,
  error: '',
}


export const fetchHarmonics = createAsyncThunk(
  'harmonics/fetchHarmonics',
  (harmonicsUrl) => {
    return axios
          .get(harmonicsUrl.self)
          .then((response) => response.data )
          .finally((response) => console.log(response))
  }
)

export const harmonicsSlice = createSlice({
  name: 'harmonics',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchHarmonics.pending, state => {
      state.loading = true;
    })
    builder.addCase(fetchHarmonics.fulfilled, (state, action) => {
      state.loading = false
      // console.log(action.payload)
      state.harmonics = action.payload.HarmonicConstituents
      state.error = ''
    })
    builder.addCase(fetchHarmonics.rejected, (state, action) => {
      state.loading = false
      state.harmonics = []
      state.error = action.error.message
    })
  },
})

export default harmonicsSlice.reducer

