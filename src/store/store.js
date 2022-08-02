import { configureStore } from '@reduxjs/toolkit'
import stationsReducer from './features/stations'


export const store = configureStore({
  reducer: {
    stations: stationsReducer,
  },
})
