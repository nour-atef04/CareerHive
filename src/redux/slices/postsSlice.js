// for global posts list + addPost + fetchPosts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// load posts
export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
  const res = await fetch("http://localhost:3001/posts");
  const data = await res.json();
  return [...data]
    .map((p) => ({ ...p, id: Number(p.id) }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
});

// add post
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async ({ text, photoBase64, user }) => {
    const newPost = {
      id: Date.now(),
      authorId: user.id,
      authorName: user.name,
      authorImage: user.image,
      authorPosition: user.position,
      text,
      photo: photoBase64,
      date: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });

    return newPost;
  }
);

const initialState = {
  posts: [],
  loading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    deletePost(state, action) {
      // payload is the post ID
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      });
  },
});

export const { deletePost } = postsSlice.actions;
export default postsSlice.reducer;

export const getPosts = (state) => state.posts.posts;
