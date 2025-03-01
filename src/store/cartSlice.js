import { createSlice } from '@reduxjs/toolkit';

// Initial state: Load cart items from localStorage if available, otherwise set to an empty array
const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Adds an item to the cart or increases its quantity if already present
    addToCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1; // Increment quantity if item exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
      localStorage.setItem('cart', JSON.stringify(state.items)); // Update localStorage
    },

    // Removes an item from the cart based on its ID
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items)); // Update localStorage
    },

    // Increments the quantity of an item in the cart
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.items)); // Update localStorage
    },

    // Decrements the quantity of an item; removes it if quantity becomes 0
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1; // Decrease quantity if greater than 1
      }
      localStorage.setItem('cart', JSON.stringify(state.items)); // Update localStorage
    },
  },
});

// Exporting the actions so they can be dispatched from components
export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

// Exporting the reducer to be used in store configuration
export default cartSlice.reducer;
