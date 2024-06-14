import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUsers } from './getUsers';
import { getUserById } from './getUserById';
import { getAudits } from './getAudits';

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),

  endpoints: (builder) => ({
    getUsers: builder.mutation(getUsers(getUsers)),
    getUserById: builder.mutation(getUserById(getUserById)),
    getAudits: builder.mutation(getAudits(getAudits)),
  })
});

export const { useGetUsersMutation, useGetAuditsMutation, useGetUserByIdMutation } = apiSlice;
