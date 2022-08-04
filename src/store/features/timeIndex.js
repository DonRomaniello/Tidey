import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
};

export const timeIndexSlice = createSlice({
  name: 'timeIndex',
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

export const { increment, decrement, incrementByAmount, arbitraryValue } = timeIndexSlice.actions;

export const selectCount = (state) => state.timeIndex.value;

export default timeIndexSlice.reducer;
