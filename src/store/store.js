import { configureStore } from '@reduxjs/toolkit'
import stationsReducer from './features/stations'
import harmonicsReducer from './features/harmonics'
import compassInfoReducer from './features/compass'


export const store = configureStore({
  reducer: {
    stations: stationsReducer,
    harmonics: harmonicsReducer,
    compassInfo: compassInfoReducer,
  },
})
