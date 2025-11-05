import styles from "./Post.module.css";
import { useRef, useEffect } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostStatus from "./PostStatus";
import PostInteractions from "./PostInteractions";
import PostCommentSection from "./PostCommentSection";
import { usePost } from "../../context/PostContext";

export default function Post({ post }) {
  const { state } = usePost();
  const { liked, likes, comments, openComments } = state;
  const commentInputRef = useRef(null);

  // focus input when comments open
  useEffect(() => {
    if (openComments && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [openComments]);

  return (
    <div className={styles["post"]}>
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostStatus likes={likes} comments={comments}/>
      <PostInteractions liked={liked} comments={comments}/>
      {openComments && <PostCommentSection ref={commentInputRef} />}
    </div>
  );
}
