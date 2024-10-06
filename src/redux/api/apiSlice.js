import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9001/' }),
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
  }),
});

// Export the hooks for usage in components
export const { useGetProductsQuery, usePlaceOrderMutation } = apiSlice;
