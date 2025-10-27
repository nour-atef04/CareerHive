import styles from "./Post.module.css";
import { useRef, useEffect } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostStatus from "./PostStatus";
import PostInteractions from "./PostInteractions";
import PostCommentSection from "./PostCommentSection";
import { usePost } from "../../context/PostContext";

export default function Post() {
  const { state } = usePost();
  const { liked, likes, openComments } = state;
  const commentInputRef = useRef(null);

  // focus input when comments open
  useEffect(() => {
    if (openComments && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [openComments]);

  return (
    <div className={styles["post"]}>
      <PostHeader />
      <PostContent />
      <PostStatus likes={likes} />
      <PostInteractions
        liked={liked}
      />
      {openComments && <PostCommentSection ref={commentInputRef} />}
    </div>
  );
}
