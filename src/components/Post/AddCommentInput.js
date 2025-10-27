import { useState } from "react";
import styles from "./AddCommentInput.module.css";
import FormInput from "../FormInput";
import { usePost } from "../../context/PostContext";

export default function AddCommentInput({ ref }) {
  const [comment, setComment] = useState("");
  const { dispatch } = usePost();

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    dispatch({ type: "add_comment", payload: comment });
    setComment("");
  }

  return (
    <form className={styles["add-comment"]} onSubmit={handleSubmit}>
      <div className={styles["comment-icon"]}></div>
      <FormInput
        ref={ref}
        className={styles["add-comment-input"]}
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </form>
  );
}
