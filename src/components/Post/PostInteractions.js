import styles from "./PostInteractions.module.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { LuSend } from "react-icons/lu";
import { useEditPost } from "../../hooks/usePosts";

export default function PostInteractions({
  postId,
  liked,
  setLiked,
  likes,
  setLikes,
  toggleComments,
}) {
  const editMutation = useEditPost();

  function handleLike() {
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1));

    editMutation.mutate({
      postId,
      toggleLike: true,
      currentLiked: liked,
      currentLikes: likes,
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
      <div>
        <BiRepost style={{ fontSize: "large" }} />
        Repost
      </div>
      <div>
        <LuSend />
        Send
      </div>
    </div>
  );
}
