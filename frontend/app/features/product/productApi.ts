import {apiSlice} from "@/app/api/apiSlice";
import {Product, ProductImportData} from "@/app/features/product/type";

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
        }),
        importProducts: builder.mutation<
            { successCount: number; errorCount: number },
            ProductImportData[]
        >({
            query: (products) => ({
                url: '/api/products/import',
                method: 'POST',
                body: { products }
            }),
            invalidatesTags: ['Products', 'Brands']
        })
    })
});

export const {useGetProductsQuery, useImportProductsMutation} = productApi;
