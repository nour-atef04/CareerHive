// global PostsContext stores all posts

import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";

const PostsContext = createContext();

const postsState = {
  posts: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "load_posts":
      return { ...state, posts: action.payload };
    case "add_post":
      return { ...state, posts: [action.payload, ...state.posts] };

    case "delete_post":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function PostsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, postsState);
  const { user } = useAuth();

  // load posts from backend (JSON server)
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:3001/posts");
        const data = await res.json();

        // sort by most recent
        const sortedData = [...data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        dispatch({ type: "load_posts", payload: sortedData });
      } catch (err) {
        console.error("Failed to load posts", err);
      }
    }
    fetchPosts();
  }, []);

  // for post photos
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      if (!(file instanceof Blob)) {
        resolve(null); // if not a real file, just return null
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // add new post
  async function addPost(text, photo) {
    // only convert if it's a valid File/Blob
  const photoBase64 = await fileToBase64(photo);

    const newPost = {
      id: Date.now(),
      authorId: user.id,
      authorName: user.name,
      authorImage: user.image,
      authorPosition: user.position,
      text,
      photo: photoBase64, // now either base64 or null
      date: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    dispatch({ type: "add_post", payload: newPost });

    try {
      await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
    } catch (err) {
      console.error("Failed to save post", err);
    }
  }

  return (
    <PostsContext.Provider value={{ state, dispatch, addPost }}>
      {children}
    </PostsContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostsContext);
  if (!context) throw new Error("usePosts must be used within a PostsProvider");
  return context;
}

export { PostsProvider, usePosts };
