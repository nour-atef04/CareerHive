// import {useSelector } from "react-redux";
import DeleteButton from "../../ui/DeleteButton";
import styles from "./Comment.module.css";
import CommentHeader from "./CommentHeader";
// import { getUser } from "../../../redux/slices/authSlice";
import CommentContent from "./CommentContent";
import { useDeleteComment } from "../../../hooks/usePosts";
import { useAuth } from "../../../context/AuthContext";

export default function Comment({ comment, postId, setComments }) {
  const deleteCommentMutation = useDeleteComment();

  // const user = useSelector(getUser);
  const {currentUser: user} = useAuth();
  const isMine = user.name === comment.author;

  function handleDelete() {
    setComments((prev) => prev.filter((c) => c.id !== comment.id));
    deleteCommentMutation.mutate({ postId, commentId: comment.id });
  }

  return (
    <div className={styles["comment-container"]}>
      <div className={styles["comment"]}>
        <CommentHeader />
        <CommentContent comment={comment} />
      </div>
      {isMine && <DeleteButton onClick={handleDelete} />}
    </div>
  );
}
