import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // {id, name, price, image, quantity}
  totalQuantity: 0,
  totalAmount: 0,
};

const recalcTotals = (state) => {
  let qty = 0;
  let amount = 0;
  state.items.forEach((item) => {
    qty += item.quantity;
    amount += (Number(item.price) || 0) * item.quantity;
  });
  state.totalQuantity = qty;
  state.totalAmount = amount;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ id, name, price, image, quantity });
      }
      recalcTotals(state);
    },
    decrementItem: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (!existing) return;
      existing.quantity -= 1;
      if (existing.quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== id);
      }
      recalcTotals(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      recalcTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      recalcTotals(state);
    },
  },
});

export const { addToCart, decrementItem, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

