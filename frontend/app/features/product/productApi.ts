import {apiSlice} from "@/app/api/apiSlice";
import {Product} from "@/app/features/product/type";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], {
            brandId?: number;
            minPrice?: number;
        }>({
            query: (params) => ({
                url: '/api/home/products',
                params: {
                    brandId: params.brandId,
                    minPrice: params.minPrice
                }
            }),
            providesTags: ['Products']
        })
    })
});

export const {useGetProductsQuery} = productApi;
