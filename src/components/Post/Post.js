import styles from "./Post.module.css";
import { useRef, useEffect } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostStatus from "./PostStatus";
import PostInteractions from "./PostInteractions";
import PostCommentSection from "./Comments/PostCommentSection";
import { useDispatch, useSelector } from "react-redux";
import { initPostState } from "../../redux/slices/postUiSlice";

export default function Post({ post, postId }) {
  const postUi = useSelector((state) => state.postUi[postId]);
  const dispatch = useDispatch();
  const commentInputRef = useRef(null);

  // intialize UI state for this post
  useEffect(() => {
    dispatch(
      initPostState({
        postId,
        likes: post.likes,
        comments: post.comments,
      })
    );
  }, [dispatch, postId, post]);

  // focus input when comments open
  useEffect(() => {
    if (postUi?.openComments && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [postUi?.openComments]);

  if (!postUi) return null;
  return (
    <div className={styles["post"]}>
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostStatus likes={postUi.likes} comments={postUi.comments} />
      <PostInteractions
        liked={postUi.liked}
        comments={postUi.comments}
        postId={postId}
      />
      {postUi.openComments && (
        <PostCommentSection ref={commentInputRef} postId={postId} />
      )}
    </div>
  );
}
