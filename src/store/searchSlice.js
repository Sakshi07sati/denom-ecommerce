import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  filters: {
    category: 'All',
    priceRange: [0, 10000],
    sortBy: 'Featured',
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        category: 'All',
        priceRange: [0, 10000],
        sortBy: 'Featured',
      };
    },
  },
});

export const { setSearchQuery, setCategoryFilter, setPriceRange, setSortBy, clearFilters } = searchSlice.actions;
export default searchSlice.reducer;