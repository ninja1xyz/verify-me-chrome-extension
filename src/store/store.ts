import { configureStore } from "@reduxjs/toolkit";
import secretReducer from "./features/secret";

export const store = configureStore({
  reducer: {
    secret: secretReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
