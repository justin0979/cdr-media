import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export * from "./slices";
export * from "./thunks";
// docs at: https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types
export type AppDispatch = typeof store.dispatch;
