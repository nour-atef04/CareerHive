import { PostProvider } from "../../context/PostContext";
import Post from "./Post";
import AddPost from "./AddPost";
import styles from "./Posts.module.css"

export default function Posts({ className }) {
  return (
    <div className={`${styles["posts"]} ${className || ""}`}>
      <PostProvider>
        <AddPost />
        <Post />
      </PostProvider>
    </div>
  );
}
