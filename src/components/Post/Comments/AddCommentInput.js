import { useState, forwardRef } from "react";
import styles from "./AddCommentInput.module.css";
import FormInput from "../../ui/FormInput";
import ProfileIcon from "../../ui/ProfileIcon";
import { useCreateComment } from "../../../hooks/usePosts";

const AddCommentInput = forwardRef(function AddCommentInput(
  { postId, user, setComments },
  ref
) {
  const { id, image, name } = user;
  const [comment, setComment] = useState("");
  const createCommentMutation = useCreateComment();

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now(),
      text: comment,
      authorId: id,
      author: name,
      postId,
      date: new Date().toISOString(),
    };

    // optimistic local update
    setComments((prev) => [...prev, newComment]);

    // persist to backend
    createCommentMutation.mutate(newComment);

    setComment("");
  }

  return (
    <form className={styles["add-comment"]} onSubmit={handleSubmit}>
      <ProfileIcon src={`/assets/${image}.jpg`} alt="user" size="small" />
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
