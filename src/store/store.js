import { configureStore } from '@reduxjs/toolkit'
import stationsReducer from './features/stations'
import timeIndexReducer from './features/timeIndex'


export const store = configureStore({
  reducer: {
    stations: stationsReducer,
    timeIndex: timeIndexReducer,
  },
})
