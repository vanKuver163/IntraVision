
import {apiSlice} from "@/app/api/apiSlice";
import {Coin, PaymentRequest, PaymentResponse} from "@/app/features/payment/type";

export const paymentApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCoins: builder.query<Coin[], void>({
            query: () => '/api/payment/coins',
            providesTags: ['Coins']
        }),
        makePayment: builder.mutation<PaymentResponse, PaymentRequest>({
            query: (paymentRequest) => ({
                url: '/api/payment/process',
                method: 'POST',
                body: paymentRequest
            }),
            invalidatesTags: ['Coins']
        })
    }),
});

export const {useGetCoinsQuery, useMakePaymentMutation } = paymentApi;
