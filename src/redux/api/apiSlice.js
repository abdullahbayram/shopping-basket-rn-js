import { createApi } from '@reduxjs/toolkit/query/react';
import api from '@constants/urls';
import customBaseQuery from './customBaseQuery';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: api.endpoints.products }),
    }),
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: api.endpoints.checkout,
        method: 'POST',
        body: orderData,
      }),
    }),
    validatePromoCode: builder.mutation({
      query: (promoCode) => ({
        url: api.endpoints.promocode,
        method: 'POST',
        body: { promoCode },
      }),
    }),
  }),
});

export const { useGetProductsQuery, usePlaceOrderMutation, useValidatePromoCodeMutation } = apiSlice;
