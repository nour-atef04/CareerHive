import Post from "./Post";
import AddPost from "./AddPost/AddPost";
import styles from "./Posts.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
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

  // filtering of posts
  const filteredPosts = useMemo(() => {
    if (mode === "comments") {
      return posts.filter((p) =>
        p.postComments?.some((c) => c.authorId === userId),
      );
    }
    if (mode === "posts") {
      return posts.filter((p) => p.authorId === userId);
    }
    return posts;
  }, [posts, mode, userId]);

  // IntersectionObserver to load more posts
  useEffect(() => {
    if (!userId) return;
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setVisibleCount((c) => c + 5),
      { threshold: 1 },
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [userId]);

  if (isLoading) return <Loader />;

  const visiblePosts = userId
    ? filteredPosts.slice(0, visibleCount)
    : filteredPosts;

  return (
    <div className={`${styles["posts"]} ${className || ""}`}>
      {mode === "feed" && <AddPost />}
      {filteredPosts.length === 0 && (
        <div className={styles["no-posts"]}>No posts yet.</div>
      )}
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
      {userId && visibleCount < filteredPosts.length && (
        <div ref={loadMoreRef} className={styles["load-more-trigger"]}>
          <Loader />
        </div>
      )}
    </div>
  );
}
