import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email : "",
  password : ""
}

export const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    updateEmail: (state, action) => {
        state.email = action.payload;
    },
    activeUser: (state) => {
        console.log(state.email);
        return state.email
    }
  },
})

export const { updateEmail, activeUser } = activeUserSlice.actions
export default activeUserSlice.reducer