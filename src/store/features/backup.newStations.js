
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'

import axios from 'axios';

const allStations = require('../../dayData.json')

const initialState = {
  stations: allStations,
}

export const stationsSlice = createSlice({
  name: 'stations',
  initialState,
  reducers: {
  },
})

export default stationsSlice.reducer

