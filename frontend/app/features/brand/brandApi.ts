import {apiSlice} from "@/app/api/apiSlice";
import {Brand} from "@/app/features/brand/type";

export const brandApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBrands: builder.query<Brand[], void>({
            query: () => '/api/home/brands',
            providesTags: ['Brands']
        }),
    }),
});

export const {useGetBrandsQuery} = brandApiSlice;
