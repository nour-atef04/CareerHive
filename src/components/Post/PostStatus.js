import styles from "./PostStatus.module.css";
import like2 from "../../assets/like2.png";

export default function PostStatus({ likes, comments }) {
  return (
    <div className={styles["status"]}>
      <div>
        <img src={like2} alt={`${likes} likes`} />
        {likes} likes
      </div>
      <div>{comments.length} comments</div>
    </div>
  );
}
