import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../../src/api/apiSlice';

const initialState = {
  audits: {
    audits: [],
    total: 0,
    pagination: {
      page: 1,
      size: 10,
      sortOrder: 'desc',
      sortField: 'createdAt',
      defaultSort: 'ascend',
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30'],
      showQuickJumper: true,
    }
  },
};

export const selectAuditsReducer = (state) => state.audits;

export const selectAudits = createDraftSafeSelector(
  selectAuditsReducer,
  (state) => state.audits.audits
);

export const selectAuditsTotal = createDraftSafeSelector(
  selectAuditsReducer,
  (state) => state.audits.total
);

export const selectSize = createDraftSafeSelector(
  selectAuditsReducer,
  (state) => state.audits.pagination.size
);

export const selectPage = createDraftSafeSelector(
  selectAuditsReducer,
  (state) => state.audits.pagination.page
);

export const selectDefaultSort = createDraftSafeSelector(
  selectAuditsReducer,
  (state) => state.audits.pagination.defaultSort
);

export const selectPagination = createDraftSafeSelector(
  selectAuditsReducer,
  (state) => state.audits.pagination
);

export const selectSortOrder = createDraftSafeSelector(
  selectAuditsReducer,
  (state) => state.audits.pagination.sortOrder
);

export const selectSortField = createDraftSafeSelector(
  selectAuditsReducer,
  (state) => state.audits.pagination.sortField
);

export const auditsInfoSlice = createSlice({
  name: 'audits',
  initialState,
  reducers: {
    updatePagination: (state, action) => {
      state.audits.pagination.page = action.payload.page;
      state.audits.pagination.size = action.payload.size;
      state.audits.pagination.sortField = action.payload.sortField;
      state.audits.pagination.sortOrder = action.payload.sortOrder;
      state.audits.pagination.defaultSort = action.payload.defaultSort ?? null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSlice.endpoints.getAudits.matchPending, () => {
        // console.log('matchPending')
      })
      .addMatcher(apiSlice.endpoints.getAudits.matchFulfilled, (state, action) => {
        // console.log('matchFulfilled')
        state.audits.audits = action.payload.audits;
        state.audits.total = action.payload.total;
      })
      .addMatcher(apiSlice.endpoints.getAudits.matchRejected, () => {
        // console.log('matchRejected')
      });
  },
});

export const { updatePagination } = auditsInfoSlice.actions;
export default auditsInfoSlice.reducer;
