import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { IProduct } from '@/interfaces';

type CartItem = IProduct & { quantity: number };

interface CartState {
  items: CartItem[];
  phone: string;
}

const initialState: CartState = {
  items: [],
  phone: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },
    changeQuantity: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        if (action.payload.quantity) {
          item.quantity = action.payload.quantity;
        } else {
          item.quantity = 1;
        }
      }
    },
    changePhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.phone = '';
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity, changePhone, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
