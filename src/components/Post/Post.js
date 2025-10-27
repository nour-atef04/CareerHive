import styles from "./Post.module.css";
import { useState, useRef, useEffect } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostStatus from "./PostStatus";
import PostInteractions from "./PostInteractions";
import PostCommentSection from "./PostCommentSection";

export default function Post() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(200);
  const [openComments, setOpenComments] = useState(false);

  const commentInputRef = useRef(null);

  function handleLike() {
    if (liked) {
      setLiked(false);
      setLikes((likes) => likes - 1);
    } else {
      setLiked(true);
      setLikes((likes) => likes + 1);
    }
  }

  function handleOpenComments() {
    setOpenComments(true);

    // If already open → just focus the input
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }

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
        onLike={handleLike}
        onOpenComments={handleOpenComments}
      />
      {openComments && <PostCommentSection ref={commentInputRef} />}
    </div>
  );
}
