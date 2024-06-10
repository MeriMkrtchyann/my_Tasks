import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: localStorage.getItem('access_token'),
  isAuthenticated: !!localStorage.getItem('access_token'),
  activeAdmin : {  },
}

export const selectAuthReducer = (state) => state.activeAdmin;

export const selectAccessToken = createDraftSafeSelector(
  selectAuthReducer,
  (authState) => authState.accessToken,
);

export const selectActiveAdmin = createDraftSafeSelector(
  selectAuthReducer,
  (authState) => authState.activeAdmin,
);

export const selectIsAuthenticated = createDraftSafeSelector(
  selectAuthReducer,
  (authState) => authState.isAuthenticated,
);

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