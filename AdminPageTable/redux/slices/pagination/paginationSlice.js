import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  page : 1,
  size : 10,
  total : 50,
  sortOrder : "desc",
  sortField :"createdAt",
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


export const selectSortOrder = createDraftSafeSelector(
  paginationReducer,
  (state) => state.sortOrder
);

export const selectSortField = createDraftSafeSelector(
  paginationReducer,
  (state) => state.sortField
);

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    updatePagination : (state , action) => {
      state.page = action.payload.page;
      state.size = action.payload.size;
      state.total = action.payload.total;
      state.sortField = action.payload.sortField
      state.sortOrder = action.payload.sortOrder 
    },
    updatePaginationTotal : (state , action) => {
      state.total = action.payload;
    }
  },
})

export const { updatePagination, updatePaginationTotal, resetPagination } = paginationSlice.actions
export default paginationSlice.reducer