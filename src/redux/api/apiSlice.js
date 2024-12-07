import { createApi } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://';

const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
};

const customBaseQuery = async (args) => {
  const { url, method = 'GET', body, headers } = args;

  try {
    const response = await fetchWithTimeout(`${baseUrl}${url}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    if (!response.ok) {
      return {
        error: {
          status: response.status,
          msg: await response.text(),
        },
      };
    }
    return { data: await response.json() };
  } catch (error) {
    return {
      error: {
        status: 'FETCH_ERROR',
        msg: error.message,
      },
    };
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: 'fakestoreapi.com/products' }),
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

export const { useGetProductsQuery, usePlaceOrderMutation, useValidatePromoCodeMutation } = apiSlice;
