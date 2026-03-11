import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    search: searchReducer,
  },
});

