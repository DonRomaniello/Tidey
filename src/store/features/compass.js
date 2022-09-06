import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

export const setDistance = createAsyncThunk(
  'compassInfo/setDistance',
  (info) => {
    let {e, mouseInfo} = info
    let distanceTo = Math.floor(Math.sqrt(
                    Math.pow((mouseInfo.x - e.x),2)
                    + Math.pow((mouseInfo.y - e.y),2)))

    return distanceTo
  }
)

const initialState = {
  distance: 0,
  loading: false,
};

export const compassInfoSlice = createSlice({
  name: 'compassInfo',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(setDistance.pending, state => {
      state.loading = true;
    })
    builder.addCase(setDistance.fulfilled, (state, action) => {
      state.loading = false
      state.distance = action.payload
    })
    builder.addCase(setDistance.rejected, (state) => {
      state.loading = false
    })
  }
});

export default compassInfoSlice.reducer;
