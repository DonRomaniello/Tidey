import { configureStore } from '@reduxjs/toolkit'
import stationsReducer from './features/stations'
import harmonicsReducer from './features/harmonics'
import compassReducer from './features/compass'


export const store = configureStore({
  reducer: {
    stations: stationsReducer,
    harmonics: harmonicsReducer,
    compass: compassReducer,
  },
})
