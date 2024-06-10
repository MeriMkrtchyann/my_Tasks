import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  usersInfo : {  },
}

export const selectAuthReducer = (state) => state.auditsInfo;

export const selectUsersInfo = createDraftSafeSelector(
  selectAuthReducer,
  (usersInfo) => usersInfo,
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