import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "../DeleteButton";
import ProfileIcon from "../ProfileIcon";
import styles from "./Comment.module.css";
import { getUser } from "../../redux/slices/authSlice";
import { deleteComment } from "../../redux/slices/postUiSlice";

export default function Comment({ comment, postId }) {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const { name, image, position } = user;

  const isMine = user.name === comment.author;

  function handleDelete() {
    // dispatch({ type: "delete_comment", payload: comment.id });
    dispatch(deleteComment({ postId, commentId: comment.id }));
  }

  return (
    <div className={styles["comment-container"]}>
      <div className={styles["comment"]}>
        <div className={styles["commenter-header"]}>
          <ProfileIcon src={`/assets/${image}.jpg`} alt="user" size="small" />
          <div>
            <p className={styles["name"]}>{name}</p>
            <p>{position}</p>
          </div>
        </div>
        <p className={styles["comment-content"]}>{comment.text}</p>
      </div>
      {isMine && <DeleteButton onClick={handleDelete} />}
    </div>
  );
}
