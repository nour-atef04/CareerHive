import styles from "./PostInteractions.module.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { LuSend } from "react-icons/lu";

export default function PostInteractions({
  liked,
  reposted,
  onLike,
  onRepost,
  toggleComments,
}) {
  return (
    <div className={styles["interactions"]}>
      <div
        onClick={(e) => {
          e.preventDefault();
          onLike();
        }}
        className={liked ? styles["liked"] : ""}
      >
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
        onClick={(e) => {
          e.preventDefault();
          onRepost();
        }}
        className={reposted ? styles["reposted"] : ""}
      >
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
