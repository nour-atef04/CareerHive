import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import AddPost from "./AddPost/AddPost";
import styles from "./Posts.module.css";
import { loadPosts } from "../../redux/slices/postsSlice";
import { useEffect, useRef, useState } from "react";

export default function Posts({ className, userId, commentedPostfilter }) {
  const [openOptionsPostId, setOpenOptionsPostId] = useState(null);

  const { posts, loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // local state for lazy loading of posts
  const [visibleCount, setVisibleCount] = useState(5);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  let filteredPosts = posts;

  if (commentedPostfilter) {
    // If filter prop exists -> ALWAYS use it
    filteredPosts = posts.filter(commentedPostfilter);
  } else if (userId) {
    // Otherwise fallback to userId filtering
    filteredPosts = posts.filter((p) => p.authorId === userId);
  }

  // IntersectionObserver to load more posts
  useEffect(() => {
    if (!userId) return; // only lazy loading inside profile page

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => c + 5);
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
  }, [userId]);

  const visiblePosts = userId
    ? filteredPosts.slice(0, visibleCount)
    : filteredPosts;

  return (
    <div className={`${styles["posts"]} ${className || ""}`}>
      {!userId && <AddPost />}
      {!loading &&
        visiblePosts.map((post) => (
          <Post
            key={post.id}
            post={post}
            openOptionsPostId={openOptionsPostId}
            setOpenOptionsPostId={setOpenOptionsPostId}
            commentedPostfilter={commentedPostfilter}
          />
        ))}

      {/*Lazy-loading trigger*/}
      {userId && visibleCount < filteredPosts.length && (
        <div ref={loadMoreRef} className={styles["load-more-trigger"]}>
          Loading...
        </div>
      )}
    </div>
  );
}
