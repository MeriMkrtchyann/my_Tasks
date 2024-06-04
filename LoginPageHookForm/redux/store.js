import { configureStore } from '@reduxjs/toolkit'
import activUserReducer from "../redux/slices/activUser/activUserSlice"

export const store = configureStore({
  reducer: {
    activUser :activUserReducer
  },
})