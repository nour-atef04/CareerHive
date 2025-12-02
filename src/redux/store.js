import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import followReducer from "./slices/followSlice";
import postsReducer from "./slices/postsSlice";
import postUiReducer from "./slices/postUiSlice";
import chatsReducer from "./slices/chatsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    follow: followReducer,
    posts: postsReducer,
    postUi: postUiReducer,
    chats: chatsReducer,
  },
});
