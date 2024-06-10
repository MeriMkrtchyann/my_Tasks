import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  usersInfo : { },
}

export const selectAuthReducer = (state) => state.usersInfo;

export const selectUsersInfo = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.usersInfo.users,

);

export const usersInfoSlice = createSlice({
  name: 'usersInfo',
  initialState,
  reducers: {
    updateUsersInfo : (state, action) => {
      state.usersInfo = action.payload;
    },
  },
})

export const { updateUsersInfo } = usersInfoSlice.actions
export default usersInfoSlice.reducer