import { usePosts } from "../../context/PostsContext";
import Post from "./Post";
import AddPost from "./AddPost";
import styles from "./Posts.module.css";
import { PostProvider } from "../../context/PostContext";

export default function Posts({ className }) {
  const { state } = usePosts();
  const { posts } = state;

  return (
    <div className={`${styles["posts"]} ${className || ""}`}>
      <AddPost />
      {posts.map((post) => (
        <PostProvider key={post.id} post={post}>
          <Post key={post.id} post={post} />
        </PostProvider>
      ))}
    </div>
  );
}
