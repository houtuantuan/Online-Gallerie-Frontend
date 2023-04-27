import { createSlice } from '@reduxjs/toolkit'

export const itemSlice = createSlice({
  name: 'item',
  initialState: {
    value: "image",
  },
  reducers: {
    addImage: (state, action) => {
             state.value = action.payload
           },
  },
})

export const {addImage } = itemSlice.actions

export const selectItem = (state) => state.item.value

export default itemSlice.reducer
