import { createSlice } from "@reduxjs/toolkit";
import products from "../../data/furn";

const initialState = {
  productsAll: products,
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
  isLoading: true,
  singleProductQuantity: 1,
  error: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addToCart: (state, actions) => {
      const { payload } = actions;
      const productItem = state.productsAll.find((item) => {
        return payload === item.id;
      });
      const repeatItem = state.cartItems.find((item) => {
        return payload === item.id;
      });

      if (!repeatItem) {
        state.cartItems = [
          ...state.cartItems,
          { ...productItem, quantity: state.singleProductQuantity },
        ];
      }
      if (repeatItem) {
        state.cartItems = state.cartItems.map((item) => {
          if (payload === item.id) {
            return {
              ...item,
              quantity: item.quantity + state.singleProductQuantity,
            };
          } else {
            return item;
          }
        });
      }
    },
    addCartItem: (state, actions) => {
      let id = actions.payload.id;
      let quantity = 1;
      state.cartItems.map((item) => {
        if (id === item.id) {
          item.quantity = item.quantity + quantity;
        }
      });
    },
    minusCartItem: (state, actions) => {
      const { payload } = actions;
      state.cartItems.map((item) => {
        if (payload === item.id) {
          if (item.quantity > 1) {
            --item.quantity;
          } else {
            state.cartItems = state.cartItems.filter((item) => {
              return payload !== item.id;
            });
          }
        }
      });
    },
    removeCartItem: (state, actions) => {
      const { payload } = actions;
      state.cartItems = state.cartItems.filter((item) => {
        return payload !== item.id;
      });
    },
    customQuantity: (state, actions) => {
      const { payload } = actions;
      if (payload < 1) {
        return;
      } else {
        state.singleProductQuantity = payload;
      }
    },
    calculate: (state) => {
      state.totalAmount = state.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      state.totalQuantity = state.cartItems.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    },

    // end of reducers
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  clearCart,
  addToCart,
  addCartItem,
  minusCartItem,
  removeCartItem,
  calculate,
  customQuantity,
} = cartSlice.actions;
