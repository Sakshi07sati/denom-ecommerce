// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [], // Array of product IDs
// };

// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState,
//   reducers: {
//     addToWishlist: (state, action) => {
//       const productId = action.payload;
//       if (!state.items.includes(productId)) {
//         state.items.push(productId);
//       }
//     },
//     removeFromWishlist: (state, action) => {
//       const productId = action.payload;
//       state.items = state.items.filter(id => id !== productId);
//     },
//     toggleWishlist: (state, action) => {
//       const productId = action.payload;
//       const index = state.items.indexOf(productId);
//       if (index > -1) {
//         state.items.splice(index, 1);
//       } else {
//         state.items.push(productId);
//       }
//     },
//   },
// });

// export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
// export default wishlistSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const savedWishlist = localStorage.getItem('saenom_wishlist');
const initialState = savedWishlist ? JSON.parse(savedWishlist) : {
  items: [], // Array of products
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
toggleWishlist: (state, action) => {

  const product = action.payload;

  const index = state.items.findIndex(
    item => item.id === product.id
  );

  if (index !== -1) {
    state.items.splice(index, 1);
  } else {
    state.items.push(product);
  }

  localStorage.setItem(
    'saenom_wishlist',
    JSON.stringify(state)
  );
},
 clearWishlist: (state) => {
      state.items = [];
      // state.total = 0;
      localStorage.removeItem('saenom_wishlist');
    },
  },
});

export const { toggleWishlist,clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;