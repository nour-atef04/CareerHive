// // NOTE: I REFACTORED THE CODE TO USE REDUX TOOLKIT, BUT KEPT CONTEXTS FOR LEARNING PURPOSES

// // PostContext manages state of ONE post (likes, comments, etc.)
// import { createContext, useContext, useReducer } from "react";

// const PostContext = createContext();

// function reducer(state, action) {
//   switch (action.type) {
//     case "toggle_like":
//       return {
//         ...state,
//         liked: !state.liked,
//         likes: state.liked ? state.likes - 1 : state.likes + 1,
//       };

//     case "toggle_comments":
//       return {
//         ...state,
//         openComments: !state.openComments,
//       };

//     case "add_comment":
//       return {
//         ...state,
//         comments: [
//           {
//             id: Date.now(),
//             text: action.payload.text,
//             author: action.payload.author,
//           },
//           ...state.comments,
//         ],
//       };

//     case "delete_comment":
//       return {
//         ...state,
//         comments: state.comments.filter((c) => c.id !== action.payload),
//       };

//     default:
//       throw new Error(`Unknown action type: ${action.type}`);
//   }
// }

// function PostProvider({ post, children }) {
//   const initialPostState = {
//     liked: false,
//     likes: post.likes || 0,
//     openComments: false,
//     comments: post.comments || [],
//   };

//   const [state, dispatch] = useReducer(reducer, initialPostState);
//   return (
//     <PostContext.Provider value={{ state, dispatch }}>
//       {children}
//     </PostContext.Provider>
//   );
// }

// function usePost() {
//   const context = useContext(PostContext);
//   if (!context) throw new Error("usePost must be used inside PostProvider");
//   return context;
// }

// export { PostProvider, usePost };
