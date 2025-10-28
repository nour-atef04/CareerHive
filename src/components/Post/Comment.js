import { useAuth } from "../../context/AuthContext";
import { usePost } from "../../context/PostContext";
import styles from "./Comment.module.css";

export default function Comment({ comment }) {
  const { user } = useAuth();
  const { dispatch } = usePost();
  const { name, image, position } = user;

  const isMine = user.name === comment.author;

  function handleDelete() {
    dispatch({ type: "delete_comment", payload: comment.id });
  }

  return (
    <div className={styles["comment-container"]}>
      <div className={styles["comment"]}>
        <div className={styles["commenter-header"]}>
          <img
            src={`/assets/${image}.jpg`}
            alt="user"
            className={styles["comment-icon"]}
          />
          <div>
            <p className={styles["name"]}>{name}</p>
            <p>{position}</p>
          </div>
        </div>
        <p className={styles["comment-content"]}>{comment.text}</p>
      </div>
      {isMine && (
        <button onClick={handleDelete} className={styles["delete-btn"]}>
          X
        </button>
      )}
    </div>
  );
}
