import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'fakestoreapi.com/products',
    }),
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: 'localhost:9001/checkout',
        method: 'POST',
        body: orderData,
      }),
    }),
    validatePromoCode: builder.mutation({
      query: (promoCode) => ({
        url: 'localhost:9001/promocode',
        method: 'POST',
        body: { promoCode },
      }),
    }),
  }),
});

// Export the hooks for usage in components
export const { useGetProductsQuery, usePlaceOrderMutation, useValidatePromoCodeMutation } = apiSlice;
