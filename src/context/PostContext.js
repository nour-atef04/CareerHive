import { createContext, useContext, useReducer } from "react";

const PostContext = createContext();

const postState = {
  liked: false,
  likes: 200,
  openComments: false,
  comments: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "toggle_like":
      return {
        ...state,
        liked: !state.liked,
        likes: state.liked ? state.likes - 1 : state.likes + 1,
      };

    case "toggle_comments":
      return {
        ...state,
        openComments: !state.openComments,
      };

    case "add_comment":
      return {
        ...state,
        comments: [
          {
            id: Date.now(),
            text: action.payload.text,
            author: action.payload.author,
          },
          ...state.comments,
        ],
      };

    case "delete_comment":
      return {
        ...state,
        comments: state.comments.filter((c) => c.id !== action.payload),
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function PostProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, postState);
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
}

function usePost() {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePost must be used inside PostProvider");
  return context;
}

export { PostProvider, usePost };
