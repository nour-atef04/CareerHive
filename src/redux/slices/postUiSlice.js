// for single-post likes/comments UI

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const postUiSlice = createSlice({
  name: "postUi",
  initialState,
  reducers: {
    initPostState(state, action) {
      // payload is the entire post object
      const { postId, likes, comments } = action.payload;
      if (!state[postId]) {
        state[postId] = {
          liked: false,
          likes: likes ?? 0,
          comments: comments || [],
          openComments: false,
        };
      }
    },
    toggleLike(state, action) {
      // payload is the post id
      const id = action.payload;
      const post = state[id];
      post.liked = !post.liked;
      post.likes = post.liked ? post.likes + 1 : post.likes - 1;
    },
    toggleComments(state, action) {
      // payload is the post id
      const id = action.payload;
      const post = state[id];
      post.openComments = !post.openComments;
    },
    addComment(state, action) {
      // payload is the comment object
      const { postId, text, author } = action.payload;
      const post = state[postId];
      post.comments.unshift({
        id: Date.now(),
        text,
        author,
      });
    },
    deleteComment(state, action) {
      const { postId, commentId } = action.payload;
      const post = state[postId];
      post.comments = post.comments.filter(
        (comment) => comment.id !== commentId
      );
    },
  },
});

export const {
  initPostState,
  toggleLike,
  toggleComments,
  addComment,
  deleteComment,
} = postUiSlice.actions;

export default postUiSlice.reducer;
