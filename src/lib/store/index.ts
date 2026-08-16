import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "./api/productsApi";
import cartReducer from "./slices/cartSlice";

/**
 * A fresh store per request — the App Router renders on the server, so a
 * module-level singleton would leak state between users.
 */
export const makeStore = () => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(productsApi.middleware),
  });
  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
