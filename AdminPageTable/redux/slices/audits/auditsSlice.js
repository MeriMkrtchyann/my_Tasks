import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  audits : { 
    total : null,
  },
}

export const selectAuthReducer = (state) => state.audits

export const selectAudits = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.audits.audits,
);

export const selectAuditsTotal = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.audits.total,
);

export const auditsInfoSlice = createSlice({
  name: 'audits',
  initialState,
  reducers: {
    updateAuditsInfo : (state, action) => {
      state.audits = action.payload;
    },
    updateAuditsTotal : (state, action) => {
      state.total = action.payload;
    }
  },
})

export const { updateAuditsInfo , updateAuditsTotal  } = auditsInfoSlice.actions
export default auditsInfoSlice.reducer