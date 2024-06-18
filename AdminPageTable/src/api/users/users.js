import { apiSlice } from "../apiSlice";
import { urls } from "../../config/urls";
import { stringify } from "qs";

export const usersIpa = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getUsers : builder.mutation({
            query: (params) => ({
                method: 'GET',
                url: `${urls.aboutUsers}?${stringify(params)}`,
              }),
        }),
        getUserById : builder.mutation({
            query: (params) => ({
                method: 'GET',
                url: `${urls.details}?${stringify(params)}`,
            }),
        }),
        getUserInfo : builder.mutation({
            query: (userId) => ({
                url: `${urls.userDetails}/${userId}`,
                method: 'GET',
            }),
        }),
    })
})

export const {
    endpoints,
    useGetUserByIdMutation,
    useGetUserInfoMutation,
    useGetUsersMutation,
} = usersIpa

