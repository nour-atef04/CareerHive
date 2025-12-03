// for single-post likes/comments UI

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// toggle like
export const toggleLikeAsync = createAsyncThunk(
  "postUi/toggleLike",
  async (postId, { dispatch }) => {
    // optimistic update (instead of waiting for backend save)
    dispatch(postUiSlice.actions.toggleLike(postId));

    const res = await fetch(`http://localhost:3001/posts/${postId}`);
    const post = await res.json();

    const updatedPost = {
      ...post,
      liked: !post.liked,
      likes: post.liked ? post.likes - 1 : post.likes + 1,
    };

    await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    });

    return updatedPost;
  }
);

// add comment
export const addCommentAsync = createAsyncThunk(
  "postUi/addComment",
  async ({ postId, text, author }, { dispatch }) => {
    // optimistic update (instead of waiting for backend save)
    dispatch(postUiSlice.actions.addComment({ postId, text, author }));

    const res = await fetch(`http://localhost:3001/posts/${postId}`);
    const post = await res.json();

    const updatedPost = {
      ...post,
      comments: [
        {
          id: Date.now(),
          text,
          author,
        },
        ...post.comments,
      ],
    };

    await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    });

    return updatedPost;
  }
);

// delete comment
export const deleteCommentAsync = createAsyncThunk(
  "postUi/deleteComment",
  async ({ postId, commentId }, { dispatch }) => {
    dispatch({ type: "postUi/deleteComment", payload: { postId, commentId } });

    const res = await fetch(`http://localhost:3001/posts/${postId}`);
    const post = await res.json();

    const updatedPost = {
      ...post,
      comments: post.comments.filter((comment) => comment.id !== commentId),
    };

    await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    });

    return { postId, commentId };
  }
);

const initialState = {};

const postUiSlice = createSlice({
  name: "postUi",
  initialState,
  reducers: {
    initPostState(state, action) {
      // payload is the entire post object
      const { postId, liked, likes, comments } = action.payload;
      if (!state[postId]) {
        state[postId] = {
          liked,
          likes,
          comments,
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
      const postUi = state[id];
      postUi.openComments = !postUi.openComments;
    },
    addComment(state, action) {
      // payload is the comment object
      const { postId, text, author } = action.payload;
      const postUi = state[postId];
      postUi.comments.unshift({
        id: Date.now(),
        text,
        author,
      });
    },
    deleteComment(state, action) {
      const { postId, commentId } = action.payload;
      const postUi = state[postId];
      postUi.comments = postUi.comments.filter(
        (comment) => comment.id !== commentId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleLikeAsync.fulfilled, (state, action) => {
        // payload is the updatedPost we return from the thunk
        const post = action.payload;
        const postUi = state[post.id]; // state after initPostState runs

        // when thunk returns the updated post, it’s possible that initPostState hasn’t run yet for this post, so check first
        if (postUi) {
          postUi.liked = post.liked;
          postUi.likes = post.likes;
        }
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        const post = action.payload;
        const postUi = state[post.id];

        if (postUi) {
          postUi.comments = post.comments;
        }
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        const postUi = state[postId];

        if (postUi) {
          postUi.comments = postUi.comments.filter(
            (comment) => comment.id !== commentId
          );
        }
      });
  },
});

export const { initPostState, toggleComments } = postUiSlice.actions;
export default postUiSlice.reducer;
