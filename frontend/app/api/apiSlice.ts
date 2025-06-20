import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5001/',
    prepareHeaders: (headers) => {
        return headers;
    }
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    tagTypes:['Brands', 'Products', 'Coins'],
    endpoints: () => ({}),
});
