import { createSlice } from '@reduxjs/toolkit';

// Initial state: Contains an empty array to store product items
const initialState = {
  items: [],
};

const productsSlice = createSlice({
  name: 'products', // Slice name
  initialState,
  reducers: {
    // Sets the products in the state with the data received from an API or other source
    setProducts: (state, action) => {
      state.items = action.payload; // Updates the items array with fetched products
    },
  },
});

// Exporting the action to be dispatched when setting products
export const { setProducts } = productsSlice.actions;

// Exporting the reducer to be used in store configuration
export default productsSlice.reducer;
