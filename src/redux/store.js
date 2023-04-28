import { configureStore } from '@reduxjs/toolkit'
import itemReducer from './itemSlice'
import canvasReducer from './canvasSlice'
import brushReducer from './brushSlice'

export const store = configureStore({
  reducer: {
    item: itemReducer,
    canvas: canvasReducer,
    brush: brushReducer,
  },
})
