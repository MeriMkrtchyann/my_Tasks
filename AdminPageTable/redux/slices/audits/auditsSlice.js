import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  auditsInfo : { },
}

export const selectAuthReducer = (state) => state.auditsInfo;

export const selectAccessToken = createDraftSafeSelector(
  selectAuthReducer,
  (auditsInfo) => auditsInfo,
);

export const auditsInfoSlice = createSlice({
  name: 'auditsInfo',
  initialState,
  reducers: {
    updateAuditsInfo : (state, action) => {
      state.auditsInfo = action.payload;
    },
  },
})

export const { updateAuditsInfo } = auditsInfoSlice.actions
export default auditsInfoSlice.reducer