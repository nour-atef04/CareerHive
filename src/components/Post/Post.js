import styles from "./Post.module.css";
import { useRef, useEffect, useState } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostStatus from "./PostStatus";
import PostInteractions from "./PostInteractions";
import PostCommentSection from "./Comments/PostCommentSection";
import { useDispatch, useSelector } from "react-redux";
import { initPostState } from "../../redux/slices/postUiSlice";
import PostEditOptions from "./PostEditOptions";
import { getUser } from "../../redux/slices/authSlice";
import PostEditModal from "./PostEditModal";

export default function Post({
  post,
  openOptionsPostId,
  setOpenOptionsPostId,
}) {
  const postId = post.id;
  const postUi = useSelector((state) => state.postUi[postId]);
  const dispatch = useDispatch();
  const commentInputRef = useRef(null);
  const user = useSelector(getUser);
  const [editPostId, setEditPostId] = useState(null);

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
      <div className={styles["post-header"]}>
        <PostHeader post={post} />
        {post.authorId === user.id && (
          <PostEditOptions
            post={post}
            openOptionsPostId={openOptionsPostId}
            setOpenOptionsPostId={setOpenOptionsPostId}
            setEditPostId={setEditPostId}
          />
        )}
      </div>
      <PostContent post={post} openOptionsPostId={openOptionsPostId} />
      <PostStatus likes={postUi.likes} comments={postUi.comments} />
      <PostInteractions
        liked={postUi.liked}
        comments={postUi.comments}
        postId={postId}
      />
      {postUi.openComments && (
        <PostCommentSection ref={commentInputRef} postId={postId} />
      )}
      {editPostId === postId && (
        <PostEditModal post={post} onClose={() => setEditPostId(null)} />
      )}
    </div>
  );
}
