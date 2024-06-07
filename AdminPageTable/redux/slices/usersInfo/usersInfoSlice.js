import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  usersInfo : {  },
}

export const usersInfoSlice = createSlice({
  name: 'usersInfo',
  initialState,
  reducers: {
    updateUsersInfo : (state, action) => {
      state.usersInfo = action.payload;
    },
  },
})

export const { updateUsersInfo } = usersInfoSlice.actions
export default usersInfoSlice.reducer