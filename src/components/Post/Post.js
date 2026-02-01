import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Panel from "../ui/Panel";
import PostCommentSection from "./Comments/PostCommentSection";
import styles from "./Post.module.css";
import PostContent from "./PostContent";
import PostEditModal from "./PostEditModal";
import PostEditOptions from "./PostEditOptions";
import PostHeader from "./PostHeader";
import PostInteractions from "./PostInteractions";
import PostStatus from "./PostStatus";

export default function Post({
  post,
  mode = "feed", // + "details"
  profileUserId,
  openOptionsPostId,
  setOpenOptionsPostId,
}) {
  const { currentUser } = useAuth();
  const commentInputRef = useRef(null);
  const [openComments, setOpenComments] = useState(
    mode === "comments" || mode === "details",
  );
  const [editPostId, setEditPostId] = useState(null);

  const postLikes = post.postLikes || [];
  const isLiked = postLikes.some((like) => like.userId === currentUser?.id);
  const likesCount = postLikes.length;

  const postReposts = post.postReposts || [];
  const isReposted = postReposts.some(
    (repost) => repost.userId === currentUser?.id,
  );

  const comments = post.postComments || [];

  // focus input when manually opening comments
  useEffect(() => {
    if (openComments && commentInputRef.current && mode !== "comments") {
      commentInputRef.current.focus();
    }
  }, [openComments, mode]);

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
        post={post}
        currentUser={currentUser}
        liked={isLiked}
        reposted={isReposted}
        toggleComments={() => setOpenComments((prev) => !prev)}
      />
      {openComments && (
        <PostCommentSection
          ref={commentInputRef}
          postId={post.id}
          postAuthorId={post.authorId}
          comments={comments}

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
