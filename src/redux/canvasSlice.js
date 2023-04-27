import { createSlice } from '@reduxjs/toolkit'

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    width: 620,
    height: 576,
    uriList: []
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
    }
  },
   
})

export const {changeCanvasSize, addUri} = canvasSlice.actions

export const selectCanvasUri = (state) => state.canvas.uriList;

export default canvasSlice.reducer
