import {
  createSlice,
 } from '@reduxjs/toolkit'


const initialState = {
  helpOpen : false,
}

export const helpSlice = createSlice({
  name: 'help',
  initialState,
  reducers: {
    openHelp: (state) => {
      state.helpOpen = true;
    },
    closeHelp: (state) => {
      state.helpOpen = false;
    },
    toggleHelp: (state) => {
      state.helpOpen = !state.helpOpen;
    }
 }
})

export const { openHelp, closeHelp, toggleHelp } = helpSlice.actions;

export default helpSlice.reducer

