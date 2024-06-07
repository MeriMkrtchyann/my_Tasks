import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: localStorage.getItem('access_token'),
  isAuthenticated: !!localStorage.getItem('access_token'),
  activeAdmin : {  },
}

export const activeAdminSlice = createSlice({
  name: 'activeAdmin',
  initialState,
  reducers: {
    updateAdminInfo : (state, action) => {
      state.activeAdmin = action.payload;
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

export const { updateAdminInfo, updateAccessToken, logout } = activeAdminSlice.actions
export default activeAdminSlice.reducer