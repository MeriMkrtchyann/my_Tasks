import { apiSlice } from "../apiSlice";
import { urls } from "../../config/urls";
import { stringify } from "qs";

export const auditsIpa = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getAudits : builder.mutation ({
            query: (params) => ({
                method: 'GET',
                url: `${urls.audits}?${stringify(params)}`,
            }),
        })
    })
})

export const {
   useGetAuditsMutation,
   
} = auditsIpa



