import { createSlice } from '@reduxjs/toolkit';

const _calculateDistance = (info) => {

  const {e, mouseInfo} = info

  let distanceTo = Math.floor(Math.sqrt(
    Math.pow((mouseInfo.x - e.x),2)
    + Math.pow((mouseInfo.y - e.y),2)))

    console.log('inthin', mouseInfo, distanceTo)

    return distanceTo

}



const initialState = {
  distance: 0,
};

export const compassInfoSlice = createSlice({
  name: 'compassInfo',
  initialState,
  reducers: {
    setDistance: (state, action) => {
      state.distance = _calculateDistance(action.payload)
    },
  },
});

export const { setDistance } = compassInfoSlice.actions;

export const selectDistance = (state) => state.compassInfo.distance

export default compassInfoSlice.reducer;
