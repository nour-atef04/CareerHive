import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "../../ui/DeleteButton";
import styles from "./Comment.module.css";
import { deleteCommentAsync } from "../../../redux/slices/postUiSlice";
import CommentHeader from "./CommentHeader";
import { getUser } from "../../../redux/slices/authSlice";
import CommentContent from "./CommentContent";

export default function Comment({ comment, postId }) {
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const isMine = user.name === comment.author;

  function handleDelete() {
    // dispatch({ type: "delete_comment", payload: comment.id });
    dispatch(deleteCommentAsync({ postId, commentId: comment.id }));
  }

  return (
    <div className={styles["comment-container"]}>
      <div className={styles["comment"]}>
        <CommentHeader />
        <CommentContent comment={comment}/>
      </div>
      {isMine && <DeleteButton onClick={handleDelete} />}
    </div>
  );
}
