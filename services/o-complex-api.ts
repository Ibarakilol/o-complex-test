import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { IProduct, IReview } from '@/interfaces';

interface ProductsResponse {
  amount: number;
  items: IProduct[];
  page: number;
  total: number;
}

interface OrderRequest {
  cart: { id: number; quantity: number }[];
  phone: string;
}

interface OrderResponse {
  error?: string;
  success: number;
}

export const oComplexApi = createApi({
  reducerPath: 'oComplexApi',
  tagTypes: ['Product', 'Review'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, { page: number; page_size: number }>({
      query: ({ page, page_size }) => `/products?page=${page}&page_size=${page_size}`,
      providesTags: (result) =>
        result?.items
          ? [...result.items.map(({ id }) => ({ type: 'Product' as const, id })), 'Product']
          : ['Product'],
    }),
    getReviews: build.query<IReview[], void>({
      query: () => '/reviews',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Review' as const, id })), 'Review']
          : ['Review'],
    }),
    createOrder: build.mutation<OrderResponse, OrderRequest>({
      query: (body) => ({
        url: '/order',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetReviewsQuery, useLazyGetProductsQuery } = oComplexApi;
