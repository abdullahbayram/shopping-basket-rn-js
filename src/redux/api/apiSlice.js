import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:9001/';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: 'checkout',
        method: 'POST',
        body: orderData,
      }),
    }),
    validatePromoCode: builder.mutation({
      query: (promoCode) => ({
        url: 'promocode',
        method: 'POST',
        body: { promoCode },
      }),
    }),
  }),
});

// Export the hooks for usage in components
export const { useGetProductsQuery, usePlaceOrderMutation, useValidatePromoCodeMutation } = apiSlice;
