import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, CartProduct } from '../interface/index';



interface ProductState {
  products: IProduct[];
  cart: CartProduct[];
  wishlist: CartProduct[];
}

const initialState: ProductState = {
  products: [],
  wishlist: [],
  cart: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Set products
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },

    // Add item to cart
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push({ ...action.payload });
      }
    },

    // Remove item from cart
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.cart = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
    },


    // Reset cart
    resetCart: (state) => {
      state.cart = [];
    },

    // Increase item quantity in cart
    increaseQuantity: (state, action: PayloadAction<IProduct>) => {
      const item = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += 1;
      }
    },

    // Decrease item quantity in cart
    decreaseQuantity: (state, action: PayloadAction<IProduct>) => {
      const item = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // Delete item from cart
    deleteItem: (state, action: PayloadAction<IProduct>) => {
      state.cart = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
    },

    // Add item to wishlist
    addToWishlist: (state, action: PayloadAction<CartProduct>) => {
      const existingItem = state.wishlist.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.wishlist.push({ ...action.payload });
      }
    },

    // Delete item from wishlist
    deleteItemFromWishlist: (state, action: PayloadAction<IProduct>) => {
      state.wishlist = state.wishlist.filter(
        (item) => item._id !== action.payload._id
      );
    },

    // Reset wishlist
    resetWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const {
  setProducts,
  addToCart,
  resetCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  addToWishlist,
  deleteItemFromWishlist,
  resetWishlist,
} = productSlice.actions;

export default productSlice.reducer;
