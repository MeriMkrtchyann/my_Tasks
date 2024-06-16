import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { apiSlice } from '../../../src/api/apiSlice';

const initialState = {
  documents : [],
  userId : null,
  user: {},
}

export const selectAuthReducer = (state) => state.usersDetails;

export const selectUserId = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.userId
);

export const selectUser = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.user
);

export const selectUserDocuments = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.documents
);

export const usersDetailsSlice = createSlice({
  name: 'usersDetails',
  initialState,
  reducers: {
    updateId: (state, action) => {
      state.userId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSlice.endpoints.getUserById.matchPending, () => {
        console.log('matchPending')
      })
      .addMatcher(apiSlice.endpoints.getUserById.matchFulfilled, (state, action) => {
        console.log("matchFulfilled")
        state.userId = action.payload.user.id
        state.user = action.payload.user
        state.documents = action.payload.documents
      })
      .addMatcher(apiSlice.endpoints.getUsers.matchRejected, () => {
        console.log("matchRejected")
      });
  },
})

export const { updateId } = usersDetailsSlice.actions
export default usersDetailsSlice.reducer