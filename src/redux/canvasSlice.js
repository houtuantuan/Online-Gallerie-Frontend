import { createSlice } from '@reduxjs/toolkit'
import { withTheme } from 'styled-components';

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    width: 620,
    height: 577,
    uriList: [],
    backgroundColor: "#fff",
  },
  reducers: {
    changeCanvasSize: (state, action) => {
             state.value = action.payload
           },
    addUri: (state,action) => {
            state.uriList.push(action.payload)
            if(state.uriList.length >42){
              state.uriList.shift();
            }
    },
    sliceUriList: (state, action) => {
      state.uriList = state.uriList.slice(0,state.uriList.length - action.payload +1);

    },
    changeBackground: (state,action) => {
      state.backgroundColor = action.payload;
    }
  },
   
})

export const {changeCanvasSize, addUri, sliceUriList, changeBackground} = canvasSlice.actions

export const selectCanvasUri = (state) => state.canvas.uriList;
export const selectCanvasColor = (state) => state.canvas.backgroundColor;

export default canvasSlice.reducer
