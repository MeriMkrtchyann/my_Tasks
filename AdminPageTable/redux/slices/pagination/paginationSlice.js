import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  current : 1,
  pageSize : 10,
  total : 0
}

export const paginationReducer = (state) => state.pagination;

export const selectPagination = createDraftSafeSelector(
  paginationReducer,
  (state) => state

);

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    updatePageSize : (state , action) => {
      state.pageSize = action.payload.pageSize;
    },
    updatePaginationCurrent : (state , action) => {
      state.current = action.payload.current
    },
    updatePaginationTotal : (state , action) => {
      state.total = action.payload.total;
    },
  },
})

export const { updatePageSize,updatePaginationCurrent ,updatePaginationTotal } = paginationSlice.actions
export default paginationSlice.reducer