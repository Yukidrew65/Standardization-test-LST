import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types";

export interface CartLine {
  product: Product;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  wishlist: number[];
}

const initialState: CartState = { lines: [], wishlist: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
      const { product, quantity = 1 } = action.payload;
      const line = state.lines.find((l) => l.product.id === product.id);
      if (line) line.quantity += quantity;
      else state.lines.push({ product, quantity });
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.lines = state.lines.filter((l) => l.product.id !== action.payload);
    },
    setQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const line = state.lines.find((l) => l.product.id === action.payload.id);
      if (!line) return;
      if (action.payload.quantity <= 0)
        state.lines = state.lines.filter((l) => l.product.id !== action.payload.id);
      else line.quantity = action.payload.quantity;
    },
    clearCart(state) {
      state.lines = [];
    },
    toggleWishlist(state, action: PayloadAction<number>) {
      const i = state.wishlist.indexOf(action.payload);
      if (i === -1) state.wishlist.push(action.payload);
      else state.wishlist.splice(i, 1);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setQuantity,
  clearCart,
  toggleWishlist,
} = cartSlice.actions;

export default cartSlice.reducer;

/* selectors */
import type { RootState } from "@/store";

export const selectCartLines = (s: RootState) => s.cart.lines;
export const selectCartCount = (s: RootState) =>
  s.cart.lines.reduce((n, l) => n + l.quantity, 0);
export const selectCartTotal = (s: RootState) =>
  s.cart.lines.reduce((n, l) => n + l.product.price * l.quantity, 0);
export const selectWishlistCount = (s: RootState) => s.cart.wishlist.length;
export const selectIsWishlisted = (id: number) => (s: RootState) =>
  s.cart.wishlist.includes(id);
