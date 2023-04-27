import { createSlice } from '@reduxjs/toolkit'

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    width: 620,
    height: 576
  },
  reducers: {
    changeCanvasSize: (state, action) => {
             state.value = action.payload
           },
  },
})

export const {changeCanvasSize } = itemSlice.actions

export const selectItem = (state) => state.item.value

export default canvasSlice.reducer
