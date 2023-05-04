import { configureStore } from '@reduxjs/toolkit'
import itemReducer from './itemSlice'
import canvasReducer from './canvasSlice'
import brushReducer from './brushSlice'
import colorReducer from './colorSlice'

export const store = configureStore({
  reducer: {
    item: itemReducer,
    canvas: canvasReducer,
    brush: brushReducer,
    color: colorReducer,
  },
})
