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
      postAuthorId: post.authorId,
    });
  }

  function handleRepost() {
    toggleRepost({
      postId: post.id,
      userId: currentUser.id,
      isReposted,
      postAuthorId: post.authorId,
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
      <button
        onClick={handleLike}
        className={`${styles.btn} ${liked ? styles["liked"] : ""}`}
        aria-label={liked ? "Unlike post" : "Like post"}
      >
        {liked ? <AiFillLike size={17} /> : <AiOutlineLike size={17} />}
        <span>Like</span>
      </button>
      <button
        onClick={toggleComments}
        className={styles.btn}
        aria-label="Comment on post"
      >
        <FaRegComment />
        <span>Comment</span>
      </button>
      <button
        onClick={handleRepost}
        className={`${styles.btn} ${reposted ? styles["reposted"] : ""}`}
        aria-label={reposted ? "Undo repost" : "Repost"}
      >
        <BiRepost size={20} />
        Repost
      </button>
      <button
        onClick={handleShare}
        className={styles.btn}
        aria-label="Share post"
      >
        <LuSend />
        Share
      </button>
    </div>
  );
}
