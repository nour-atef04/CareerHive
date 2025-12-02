import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import AddPost from "./AddPost/AddPost";
import styles from "./Posts.module.css";
import { loadPosts } from "../../redux/slices/postsSlice";
import { useEffect } from "react";

export default function Posts({ className }) {
  const { posts, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  return (
    <div className={`${styles["posts"]} ${className || ""}`}>
      <AddPost />
      {!loading &&
        posts.map((post) => (
          <Post key={post.id} post={post} postId={post.id} />
        ))}
    </div>
  );
}
