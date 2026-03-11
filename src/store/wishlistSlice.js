import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of product IDs
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const productId = action.payload;
      if (!state.items.includes(productId)) {
        state.items.push(productId);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(id => id !== productId);
    },
    toggleWishlist: (state, action) => {
      const productId = action.payload;
      const index = state.items.indexOf(productId);
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(productId);
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;