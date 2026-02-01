import toast from "react-hot-toast";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { useToggleLike, useToggleRepost } from "../../hooks/usePosts";
import styles from "./PostInteractions.module.css";

export default function PostInteractions({
  post,
  currentUser,
  liked,
  reposted,
  toggleComments,
}) {
  const { mutate: toggleLike } = useToggleLike();
  const { mutate: toggleRepost } = useToggleRepost();

  const postLikes = post.postLikes || [];
  const isLiked = postLikes.some((like) => like.userId === currentUser?.id);

  const postReposts = post.postReposts || [];
  const isReposted = postReposts.some(
    (repost) => repost.userId === currentUser?.id,
  );

  function handleLike() {
    toggleLike({
      userId: currentUser.id,
      postId: post.id,
      isLiked,
    });
  }

  function handleRepost() {
    toggleRepost({
      postId: post.id,
      userId: currentUser.id,
      isReposted,
    });
  }

  function handleShare() {
    const link = `${window.location.origin}/post/${post.id}`;
    // Copy to clipboard
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy link");
      });
  }

  return (
    <div className={styles["interactions"]}>
      <div onClick={handleLike} className={liked ? styles["liked"] : ""}>
        {liked ? (
          <AiFillLike style={{ fontSize: "larger" }} />
        ) : (
          <AiOutlineLike style={{ fontSize: "larger" }} />
        )}
        <span>Like</span>
      </div>
      <div onClick={toggleComments}>
        <FaRegComment />
        <span>Comment</span>
      </div>
      <div
        onClick={handleRepost}
        className={reposted ? styles["reposted"] : ""}
      >
        <BiRepost style={{ fontSize: "large" }} />
        Repost
      </div>
      <div onClick={handleShare}>
        <LuSend />
        Share
      </div>
    </div>
  );
}
