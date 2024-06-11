import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  users : { 
    total : null,
  },
  
}

export const selectAuthReducer = (state) => state.users.users;

export const selectUsers = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.users,
);

export const selectUsersTotal = createDraftSafeSelector(
  selectAuthReducer,
  (state) => state.total
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUsers : (state, action) => {
      state.users = action.payload;
    },
    updateUsersTotal : (state, action) => {
      state.total = action.payload;
    },
  },
})

export const { updateUsers, updateUsersTotal } = usersSlice.actions
export default usersSlice.reducer