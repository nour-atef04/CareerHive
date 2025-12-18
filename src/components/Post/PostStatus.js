import styles from "./PostStatus.module.css";
import { AiOutlineLike } from "react-icons/ai";

export default function PostStatus({ likes, comments, toggleComments }) {
  return (
    <div className={styles["status"]}>
      <div>
        <AiOutlineLike />
        {likes} likes
      </div>
      <div className={styles["comment-count"]} onClick={toggleComments}>
        {comments.length} comments
      </div>
    </div>
  );
}
