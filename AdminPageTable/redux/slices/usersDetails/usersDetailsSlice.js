import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { apiSlice } from '../../../src/api/apiSlice';

const initialState = {
    userId : null
}

export const selectAuthReducer = (state) => state.usersDetails;

export const selectUserId = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.userId
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
        state.userId = action.payload;
      })
      .addMatcher(apiSlice.endpoints.getUsers.matchRejected, () => {
        console.log("matchRejected")
      });
  },
})

export const { updateId } = usersDetailsSlice.actions
export default usersDetailsSlice.reducer