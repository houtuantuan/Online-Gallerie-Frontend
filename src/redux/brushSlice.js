import { createSlice } from '@reduxjs/toolkit'

export const brushSlice = createSlice({
  name: 'brush',
  initialState: {
    brushOptions:{
        brushSize: 1,
        brushColor: "#000000",
        brushDensity: 100,
        hueData: []    
    }
  },
  reducers: {
    increaseBrushSize: (state) => {
             state.brushOptions.brushSize++;
           },
           decreaseBrushSize: (state) => {
            state.brushOptions.brushSize--;
          },
          changeBrushSize: (state, action) => {
            state.brushOptions.brushSize = action.payload;
          },
          changeBrushColor: (state,action) => {
        state.brushOptions.brushColor = action.payload;
    },
    changeHueData: (state,action) => {
      state.brushOptions.hueData = action.payload;
    },
    increaseBrushDensity: (state) => {
      state.brushOptions.brushDensity++;
    },
    decreaseBrushDensity: (state) => {
     state.brushOptions.brushDensity--;
   },
   changeBrushDensity: (state, action) => {
     state.brushOptions.brushDensity = action.payload;
   },
  },
})

export const {increaseBrushSize,decreaseBrushSize,changeBrushSize,changeBrushColor, increaseBrushDensity,
decreaseBrushDensity,changeBrushDensity,changeHueData} 
= brushSlice.actions

export const selectBrushOptions = (state) => state.brush.brushOptions;



export default brushSlice.reducer
