import {
  createSlice,
 } from '@reduxjs/toolkit'


const initialState = {
  helpOpen : false,
  helpClosing: false,
}

export const helpSlice = createSlice({
  name: 'help',
  initialState,
  reducers: {
    openHelp: (state) => {
      state.helpOpen = true;
      state.helpClosing = false;
    },
    closeHelp: (state) => {
      state.helpOpen = false;
      state.helpClosing = false;
    },
    initiateHelpClose: (state) => {
      if (state.helpOpen){
        state.helpClosing = true;
      }
    },
    toggleHelp: (state) => {
      if (!state.helpOpen) {
        state.helpOpen = true
        state.helpClosing = false;
      } else {
        state.helpClosing = true;
      }
    }
 }
})

export const { openHelp, closeHelp, toggleHelp, initiateHelpClose } = helpSlice.actions;

export default helpSlice.reducer

