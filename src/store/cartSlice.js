import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of { product, quantity }
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      state.total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product.id !== productId);
      state.total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
        state.total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;