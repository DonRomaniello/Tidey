import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coords: {x: 0, y: 0, w: 0, h: 0},
  distance: 0,
  status: 'idle',
};

export const compassIndexSlice = createSlice({
  name: 'compassIndex',
  initialState,
  reducers: {
    increment: (state, action) => {
      if (state.value >= (action.payload - 1)){
        state.value = 0;
      } else {
        state.value += 1;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    arbitraryValue: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { increment, decrement, incrementByAmount, arbitraryValue } = compassIndexSlice.actions;

export const selectCount = (state) => state.compassIndex.value;

export default compassIndexSlice.reducer;
