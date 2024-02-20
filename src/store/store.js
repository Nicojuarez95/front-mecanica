import { configureStore } from "@reduxjs/toolkit";
import modalShopReducer from "./ShopModal/reducer";

export const store = configureStore({
  reducer: {
    modalShopReducer: modalShopReducer,
  },
});