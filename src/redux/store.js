import { configureStore } from '@reduxjs/toolkit'
import itemReducer from './itemSlice'
import canvasReducer from './canvasSlice'

export const store = configureStore({
  reducer: {
    item: itemReducer,
    canvas: canvasReducer,
  },
})
