import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from "./slices";
import { albumsApi } from "./apis";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    // below says to go and look up `reducerPath` property and put a new key
    // in as whatever the reducerPath string is
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(albumsApi.middleware),
});

setupListeners(store.dispatch);

// docs at: https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types
export type AppDispatch = typeof store.dispatch;
export * from "./slices";
export * from "./thunks";
export { useFetchAlbumsQuery } from "./apis";
