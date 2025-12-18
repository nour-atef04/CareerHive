// // for global posts list + addPost + fetchPosts

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // load posts
// export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
//   const res = await fetch("http://localhost:3001/posts");
//   const data = await res.json();
//   return [...data]
//     .map((p) => ({ ...p, id: Number(p.id) }))
//     .sort((a, b) => new Date(b.date) - new Date(a.date));
// });

// // add post
// export const addNewPost = createAsyncThunk(
//   "posts/addNewPost",
//   async ({ text, photoBase64, user }) => {
//     const newPost = {
//       id: Date.now().toString(),
//       authorId: user.id,
//       authorName: user.name,
//       authorImage: user.image,
//       authorPosition: user.position,
//       text,
//       photo: photoBase64,
//       date: new Date().toISOString(),
//       likes: 0,
//       liked: false,
//       comments: [],
//     };

//     await fetch("http://localhost:3001/posts", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newPost),
//     });

//     return newPost;
//   }
// );

// // delete post
// export const deletePost = createAsyncThunk(
//   "posts/deletePost",
//   async (postId) => {
//     await fetch(`http://localhost:3001/posts/${postId}`, {
//       method: "DELETE",
//     });

//     return postId;
//   }
// );

// // edit post
// export const editPost = createAsyncThunk(
//   "posts/editPost",
//   async ({ postId, newText }) => {
//     const res = await fetch(`http://localhost:3001/posts/${postId}`);
//     const post = await res.json();
//     const updatedPost = {
//       ...post,
//       date: new Date().toISOString(),
//       text: newText,
//     };

//     await fetch(`http://localhost:3001/posts/${postId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedPost),
//     });

//     return { postId, newText };
//   }
// );

// const initialState = {
//   posts: [],
//   loading: false,
// };

// const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loadPosts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(loadPosts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.posts = action.payload;
//       })
//       .addCase(addNewPost.fulfilled, (state, action) => {
//         state.posts.unshift(action.payload);
//       })
//       .addCase(deletePost.fulfilled, (state, action) => {
//         const postId = action.payload;
//         state.posts = state.posts.filter((post) => post.id !== postId);
//       })
//       .addCase(editPost.fulfilled, (state, action) => {
//         const { postId, newText } = action.payload;
//         state.posts = state.posts.map((post) =>
//           post.id === postId
//             ? { ...post, text: newText, date: new Date().toISOString() }
//             : post
//         );
//       });
//   },
// });

// export default postsSlice.reducer;

// export const getPosts = (state) => state.posts.posts;
