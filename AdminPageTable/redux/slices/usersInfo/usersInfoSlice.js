import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { apiSlice } from '../../../src/api/apiSlice';

const initialState = {
  users : { 
    users: [],
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
  
}

export const selectAuthReducer = (state) => state.users;

export const selectUsers = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.users.users,
);

export const selectUsersTotal = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.users.total
);

export const selectSize = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.users.pagination.size
);

export const selectPage = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.users.pagination.page
);

export const selectPagination = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.users.pagination
);

export const selectSortOrder = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.users.pagination.sortOrder
);

export const selectSortField = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.users.pagination.sortField
);

export const selectDefaultSort = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.users.pagination.defaultSort
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updatePagination: (state, action) => {
      state.users.pagination.page = action.payload.page;
      state.users.pagination.size = action.payload.size;
      state.users.pagination.sortField = action.payload.sortField;
      state.users.pagination.sortOrder = action.payload.sortOrder;
      state.users.pagination.defaultSort = action.payload.defaultSort ?? null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSlice.endpoints.getUsers.matchPending, () => {
        console.log('matchPending')
      })
      .addMatcher(apiSlice.endpoints.getUsers.matchFulfilled, (state, action) => {
        console.log("matchFulfilled")
        state.users.users = action.payload.users;
        state.users.total = action.payload.total;
      })
      .addMatcher(apiSlice.endpoints.getUsers.matchRejected, () => {
        console.log("matchRejected")
      });
  },
})

export const { updateUsers, updateUsersTotal, updatePagination } = usersSlice.actions
export default usersSlice.reducer