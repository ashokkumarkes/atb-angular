import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../Constant';

const baseQuery = fetchBaseQuery({baseUrl:BASE_URL});
export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes:['Product','Order','User'],
    endpoints:(builder)=>({
        // Product endpoints
        getProducts: builder.query({
            query: () => '/api/masters/get-products',
            providesTags: ['Product'],
            transformResponse: (response) => response.data || response
        }),
        getProduct: builder.query({
            query: (id) => `/api/masters/get-products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
            transformResponse: (response) => response.data || response
        }),
        createProduct: builder.mutation({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...product }) => ({
                url: `/products/${id}`,
                method: 'PUT',
                body: product
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        }),

        // Order endpoints
        getOrders: builder.query({
            query: () => '/orders',
            providesTags: ['Order']
        }),
        getOrder: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: (result, error, id) => [{ type: 'Order', id }]
        }),
        createOrder: builder.mutation({
            query: (order) => ({
                url: '/orders',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['Order']
        }),

        // User endpoints
        getUsers: builder.query({
            query: () => '/users',
            providesTags: ['User']
        }),
        getUser: builder.query({
            query: (id) => `/users/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id }]
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        })
    })
});