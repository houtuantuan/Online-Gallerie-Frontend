import { createSlice } from '@reduxjs/toolkit'

export const brushSlice = createSlice({
  name: 'brush',
  initialState: {
    brushSize: 1,
    brushColor: "#000000",
    brushDensity: 100
  },
  reducers: {
    increaseBrushSize: (state) => {
             state.brushSize = state.brushShize + 1;
           },
           decreaseBrushSize: (state) => {
            state.brushSize = state.brushShize - 1;
          },
          changeBrushSize: (state, action) => {
            state.brushSize = action.payload;
          },
  },
})

export const {increaseBrushSize,decreaseBrushSize,changeBrushSize  } 
= brushSlice.actions

export const selectBrushSize = (state) => state.brush.brushSize;
export const selectBrushColor = (state) => state.brush.brushColor;
export const selectBrushDensity = (state) => state.brush.brushDensity;



export default brushSlice.reducer
