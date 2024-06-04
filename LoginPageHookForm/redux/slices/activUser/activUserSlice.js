import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email : "",
  password : ""
}

export const activUserSlice = createSlice({
  name: 'activUser',
  initialState,
  reducers: {
    updateEmail: (state, action) => {
        state.email = action.payload;
    },
    activUser: (state) => {
        console.log(state.email);
        return state.email
    }
  },
})

export const { updateEmail, activUser } = activUserSlice.actions
export default activUserSlice.reducer