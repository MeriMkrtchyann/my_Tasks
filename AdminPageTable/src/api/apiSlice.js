import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { urls } from '../config/urls'
import { stringify } from 'qs';

export const apiSlice = createApi({
    
    reducerPath : "apiSlice",

    baseQuery: fetchBaseQuery({ 
        baseUrl: '/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('access_token')
            if(token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
   
    endpoints: (builder) => ({
        getUsers: builder.mutation({
			query: (params) => {
				return {
					url: `${urls.aboutUsers}?${stringify(params)}`,
                    method: 'GET',
				}
			},
        }),
        getAudits: builder.mutation({
			query: (params) => {
				return {
					method: 'GET',
                    url: `${urls.audits}?${stringify(params)}`,
				}
			},
        })
    })
  })

  export const { useGetUsersMutation, useGetAuditsMutation } = apiSlice

