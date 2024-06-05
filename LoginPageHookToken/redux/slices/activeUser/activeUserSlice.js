import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeUser : {
    username : "",
    email : "", 
    firstname : "",
    lastname : ""
  }
}

export const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    updateUserInfo : (state, action) => {
      state.activeUser = action.payload;
      console.log(state.activeUser)
    },
  },
})

export const { updateUserInfo } = activeUserSlice.actions
export default activeUserSlice.reducer