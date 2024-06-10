import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  audits : { },
}

export const selectAuthReducer = (state) => state.audits;

export const selectAuditsInfo = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.audits.audits,
);

export const auditsInfoSlice = createSlice({
  name: 'auditsInfo',
  initialState,
  reducers: {
    updateAuditsInfo : (state, action) => {
      state.audits = action.payload;
    },
  },
})

export const { updateAuditsInfo } = auditsInfoSlice.actions
export default auditsInfoSlice.reducer