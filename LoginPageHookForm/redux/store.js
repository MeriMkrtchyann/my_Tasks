import { configureStore } from '@reduxjs/toolkit'
import activeUserReducer from "../redux/slices/activeUser/activeUserSlice"

export const store = configureStore({
  reducer: {
    activeUser :activeUserReducer
  },
})