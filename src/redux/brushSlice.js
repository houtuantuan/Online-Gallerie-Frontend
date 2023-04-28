import { createSlice } from '@reduxjs/toolkit'

export const brushSlice = createSlice({
  name: 'brush',
  initialState: {
    brushOptions:{
        brushSize: 1,
        brushColor: "#000000",
        brushDensity: 100    
    }
  },
  reducers: {
    increaseBrushSize: (state) => {
             state.brushOptions.brushSize = state.brushOptions.brushSize + 1;
           },
           decreaseBrushSize: (state) => {
            state.brushOptions.brushSize = state.brushOptions.brushSize - 1;
          },
          changeBrushSize: (state, action) => {
            state.brushOptions.brushSize = action.payload;
          },
    changeBrushColor: (state,action) => {
        state.brushOptions.brushColor = action.payload;
    }
  },
})

export const {increaseBrushSize,decreaseBrushSize,changeBrushSize,changeBrushColor} 
= brushSlice.actions

export const selectBrushOptions = (state) => state.brush.brushOptions;



export default brushSlice.reducer
