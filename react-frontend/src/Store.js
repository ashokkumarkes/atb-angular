import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartReducer from './slices/cartSlice';
const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    // devTools:process.env.NODE_ENV !=='production',
    devTools: true,
});

export default store;