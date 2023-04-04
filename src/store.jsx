import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./features/cart/cartSlice";
import { productsReducer } from "./features/products/productsSlice";
import { utilsReducer } from "./features/utils/utilsSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    utils: utilsReducer,
  },
});
