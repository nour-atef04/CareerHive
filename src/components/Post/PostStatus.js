import styles from "./PostStatus.module.css";
import like2 from "../../assets/like2.png";

export default function PostStatus({ likes }) {
  return (
    <div className={styles["status"]}>
      <div>
        <img src={like2} alt={`${likes} likes`} />
        {likes} likes
      </div>
      <div>40 comments</div>
    </div>
  );
}
