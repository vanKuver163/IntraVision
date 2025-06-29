import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =process.env.NEXT_PUBLIC_API_URL;

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Brands', 'Products', 'Coins'],
    endpoints: () => ({}),
});
