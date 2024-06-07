import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: localStorage.getItem('access_token'),
  isAuthenticated: !!localStorage.getItem('access_token'),
  activeUser : {  },
}

export const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    updateUserInfo : (state, action) => {
      state.activeUser = action.payload;
      console.log(state.activeUser)
    },
    updateAccessToken : (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    
    logout : () => {
      localStorage.removeItem('access_token');
      
      return {
        ...initialState,
        isAuthenticated:false,
        accessToken:undefined
      }
    },
  },
})

export const { updateUserInfo } = activeUserSlice.actions
export default activeUserSlice.reducer