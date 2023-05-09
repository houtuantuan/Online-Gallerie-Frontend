import { createSlice } from '@reduxjs/toolkit'

export const brushSlice = createSlice({
  name: 'brush',
  initialState: {
    brushOptions:{
        brushSize: 1,
        brushColor: "#000000",
        brushDensity: 100,
        hueData: []    
    },
    hue: "rgba(1,180,255,1)",
    mode: "pen"
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
   changeHue: (state,action) => {
    state.hue = action.payload;
   },
   changeMode: (state,action) => {
    state.mode = action.payload;
   }
  },
})

export const {increaseBrushSize,decreaseBrushSize,changeBrushSize,changeBrushColor, increaseBrushDensity,
decreaseBrushDensity,changeBrushDensity,changeHueData,changeHue,changeMode} 
= brushSlice.actions

export const selectBrushOptions = (state) => state.brush.brushOptions;
export const selectHue = (state) => state.brush.hue;
export const selectMode = (state) => state.brush.mode;

export default brushSlice.reducer
