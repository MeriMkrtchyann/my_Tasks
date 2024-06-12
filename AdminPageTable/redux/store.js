import { configureStore } from '@reduxjs/toolkit'
import activeAdminReducer from "../redux/slices/activeAdmin/activeAdminSlice"
import usersReducer from "./slices/usersInfo/usersInfoSlice"
import auditsInfoReducer from "../redux/slices/audits/auditsSlice"


export const store = configureStore({
  reducer: {
    activeAdmin : activeAdminReducer,
    users : usersReducer,
    audits : auditsInfoReducer,
  },
})