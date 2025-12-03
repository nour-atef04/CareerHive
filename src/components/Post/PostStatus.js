import styles from "./PostStatus.module.css";
import like2 from "../../assets/like2.png";
import { useDispatch } from "react-redux";
import { toggleComments } from "../../redux/slices/postUiSlice";

export default function PostStatus({ postId, likes, comments }) {
  const dispatch = useDispatch();

  return (
    <div className={styles["status"]}>
      <div>
        <img src={like2} alt={`${likes} likes`} />
        {likes} likes
      </div>
      <div
        className={styles["comment-count"]}
        onClick={() => {
          dispatch(toggleComments(postId));
        }}
      >
        {comments.length} comments
      </div>
    </div>
  );
}
