import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery ({ 
  baseUrl : "/",
  headers : { 
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  prepareHeaders : (headers, {getState}) => {
    const state = getState()
    const token = state.activeAdmin.accessToken

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  }
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes : ['auth','user'],
  endpoints : () => ({})
})

