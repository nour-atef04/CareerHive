import Post from "./Post";
import AddPost from "./AddPost/AddPost";
import styles from "./Posts.module.css";
import { useEffect, useRef, useState } from "react";
import { usePosts } from "../../hooks/usePosts";
import Loader from "../ui/Loader";

export default function Posts({
  className,
  userId,
  followingIds,
  mode = "feed", // "feed" / "posts" / "comments" / "reposts"
}) {
  const [openOptionsPostId, setOpenOptionsPostId] = useState(null);
  const { data: posts = [], isLoading } = usePosts(followingIds, userId, mode);

  // local state for lazy loading of posts
  const [visibleCount, setVisibleCount] = useState(5);
  const loadMoreRef = useRef(null);

  // reset lazy loading when the tab changes
  useEffect(() => {
    setVisibleCount(5);
  }, [mode, userId]);

  // IntersectionObserver to load more posts
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setVisibleCount((c) => c + 5),
      { threshold: 1 },
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [userId, mode, isLoading]);

  const visiblePosts = posts.slice(0, visibleCount);
  const showLoadMore = visibleCount < posts.length;

  return (
    <div className={`${styles["posts"]} ${className || ""}`}>
      {isLoading ? (
        <Loader />
      ) : posts.length === 0 ? (
        <>
          {mode === "feed" && <AddPost />}
          <div className={styles["no-posts"]}>
            {mode === "reposts" ? "No reposts yet." : "No posts yet."}
          </div>
        </>
      ) : (
        <>
          {mode === "feed" && <AddPost />}
          {visiblePosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              mode={mode}
              profileUserId={userId} // passing this so we can sort comments later
              openOptionsPostId={openOptionsPostId}
              setOpenOptionsPostId={setOpenOptionsPostId}
            />
          ))}
          {/*Lazy-loading trigger*/}
          {showLoadMore && (
            <div ref={loadMoreRef} className={styles["load-more-trigger"]}>
              <Loader />
            </div>
          )}
        </>
      )}
    </div>
  );
}
