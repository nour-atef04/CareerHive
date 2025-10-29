import { useState, forwardRef } from "react";
import styles from "./AddCommentInput.module.css";
import FormInput from "../FormInput";
import ProfileIcon from "../ProfileIcon";
import { usePost } from "../../context/PostContext";
import { useAuth } from "../../context/AuthContext";

const AddCommentInput = forwardRef(function AddCommentInput(_, ref) {
  const { user } = useAuth();
  const { image, name } = user;
  const [comment, setComment] = useState("");
  const { dispatch } = usePost();

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    dispatch({
      type: "add_comment",
      payload: { text: comment, author: name },
    });
    setComment("");
  }

  return (
    <form className={styles["add-comment"]} onSubmit={handleSubmit}>
      <ProfileIcon
        src={`/assets/${image}.jpg`}
        alt="user"
        size="small"
      />
      <FormInput
        ref={ref}
        className={styles["add-comment-input"]}
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </form>
  );
});

export default AddCommentInput;
