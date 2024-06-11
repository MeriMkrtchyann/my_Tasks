import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
      page : 1,
      size : 10,
      total : 50,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30'],
      showQuickJumper: true,
}

export const paginationReducer = (state) => state.pagination;

export const selectSize = createDraftSafeSelector(
  paginationReducer,
  (state) => state.size
);

export const selectPage = createDraftSafeSelector(
  paginationReducer,
  (state) => state.page
);

export const selectTotal = createDraftSafeSelector(
  paginationReducer,
  (state) => state.total
);

export const selectPagination = createDraftSafeSelector(
  paginationReducer,
  (state) => state
);

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    updatePagination : (state , action) => {
      state.page = action.payload.page;
      state.size = action.payload.size;
      state.total = action.payload.total;
    },
    updatePaginationTotal : (state , action) => {
      state.total = action.payload;
    },
  },
})

export const { updatePagination, updatePaginationTotal } = paginationSlice.actions
export default paginationSlice.reducer