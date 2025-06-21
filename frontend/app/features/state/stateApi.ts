import {apiSlice} from "@/app/api/apiSlice";
import {StatusResponse} from "@/app/features/state/type";


export const stateApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStatus: builder.query<StatusResponse, string>({
            query: (userId) => ({
                url: '/api/state/status',
                params: {userId}
            }),

        }),
        releaseStatus: builder.mutation<void, string>({
            query: (userId) => ({
                url: 'api/state/release',
                method: 'POST',
                params: { userId },
            }),
        }),
    })
});

export const {useGetStatusQuery, useReleaseStatusMutation} = stateApi;
