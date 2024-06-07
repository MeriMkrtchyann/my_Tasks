import { configureStore } from '@reduxjs/toolkit'
import activeAdminReducer from "../redux/slices/activeAdmin/activeAdminSlice"
import usersInfoReducer from "./slices/usersInfo/usersInfoSlice"
import auditsInfoReducer from "../redux/slices/audits/auditsSlice"

export const store = configureStore({
  reducer: {
    activeAdmin : activeAdminReducer,
    usersInfo : usersInfoReducer,
    audits : auditsInfoReducer
  },
})