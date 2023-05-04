import { createSlice } from '@reduxjs/toolkit'

export const colorSlice = createSlice({
  name: 'color',
  initialState: {
    colorArray: [],
  },
  reducers: {
    addColor: (state, action) => {
        state.colorArray = action.payload;
           },
  },
})

export const {addColor } = colorSlice.actions
export const selectColor = (state) => state.color.colorArray
export default colorSlice.reducer
