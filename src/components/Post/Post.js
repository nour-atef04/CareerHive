import styles from "./Post.module.css";
import { useRef, useEffect, useState } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostStatus from "./PostStatus";
import PostInteractions from "./PostInteractions";
import PostCommentSection from "./Comments/PostCommentSection";
import PostEditOptions from "./PostEditOptions";
import PostEditModal from "./PostEditModal";
import Panel from "../ui/Panel";
import { useAuth } from "../../context/AuthContext";
import { useToggleLike, useToggleRepost } from "../../hooks/usePosts";

export default function Post({
  post,
  mode,
  profileUserId,
  openOptionsPostId,
  setOpenOptionsPostId,
}) {
  const { currentUser } = useAuth();
  const commentInputRef = useRef(null);
  const [openComments, setOpenComments] = useState(mode === "comments");
  const [editPostId, setEditPostId] = useState(null);

  // Status indicators derived directly from props (no local state duplication)
  const likesCount = post.postLikes?.length || 0;
  const isLiked = post.postLikes?.some(
    (like) => like.userId === currentUser.id,
  );
  const comments = post.postComments || [];

  const { mutate: toggleLike } = useToggleLike();
  const { mutate: toggleRepost } = useToggleRepost();

  // focus input when manually opening comments
  useEffect(() => {
    if (openComments && commentInputRef.current && mode !== "comments") {
      commentInputRef.current.focus();
    }
  }, [openComments, mode]);

  function handleLike() {
    toggleLike({
      postId: post.id,
      userId: currentUser.id,
      isLiked,
    });
  }

  function handleRepost() {
    toggleRepost({
      postId: post.id,
      userId: currentUser.id,
      isReposted: false, // test
    });
  }

  return (
    <Panel className={styles["post"]}>
      <div className={styles["post-header"]}>
        <PostHeader post={post} />
        {post.authorId === currentUser.id && (
          <PostEditOptions
            post={post}
            openOptionsPostId={openOptionsPostId}
            setOpenOptionsPostId={setOpenOptionsPostId}
            setEditPostId={setEditPostId}
          />
        )}
      </div>

      <PostContent post={post} openOptionsPostId={openOptionsPostId} />

      <PostStatus
        likes={likesCount}
        comments={comments}
        toggleComments={() => setOpenComments((prev) => !prev)}
      />
      <PostInteractions
        liked={isLiked}
        likesCount={likesCount}
        onLike={handleLike}
        onRepost={handleRepost}
        toggleComments={() => setOpenComments((prev) => !prev)}
      />
      {openComments && (
        <PostCommentSection
          ref={commentInputRef}
          postId={post.id}
          comments={comments}
          user={currentUser}
          // if in "comments" mode, pass the profile ID to highlight their comment
          highlightUserId={mode === "comments" ? profileUserId : null}
        />
      )}
      {editPostId === post.id && (
        <PostEditModal post={post} onClose={() => setEditPostId(null)} />
      )}
    </Panel>
  );
}
