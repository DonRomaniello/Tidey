import { configureStore } from '@reduxjs/toolkit'
import stationsReducer from './features/stations'
import harmonicsReducer from './features/harmonics'
// import compassInfoReducer from './features/compass'
import helpReducer from './features/help'


export const store = configureStore({
  reducer: {
    stations: stationsReducer,
    harmonics: harmonicsReducer,
    help: helpReducer,
  },
})
