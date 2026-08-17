import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "./api/productsApi";
import cartReducer from "./slices/cartSlice";

/**
 * Built by a factory rather than exported as a ready-made singleton, so tests
 * can spin up an isolated store instead of sharing one across cases.
 */
export const makeStore = () => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(productsApi.middleware),
  });

  // Without this, refetchOnReconnect / refetchOnFocus look configured but do nothing.
  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
