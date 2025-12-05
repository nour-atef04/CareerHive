import styles from "./PostStatus.module.css";
import { useDispatch } from "react-redux";
import { toggleComments } from "../../redux/slices/postUiSlice";
import { AiOutlineLike } from "react-icons/ai";

export default function PostStatus({ postId, likes, comments }) {
  const dispatch = useDispatch();

  return (
    <div className={styles["status"]}>
      <div >
        <AiOutlineLike />
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
