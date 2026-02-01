import { useState, forwardRef } from "react";
import styles from "./AddCommentInput.module.css";
import FormInput from "../../ui/FormInput";
import ProfileIcon from "../../ui/ProfileIcon";
import { useCreateComment } from "../../../hooks/usePosts";
import { useAuth } from "../../../context/AuthContext";

const AddCommentInput = forwardRef(function AddCommentInput(
  { postId, postAuthorId },
  ref,
) {
  const [comment, setComment] = useState("");
  const { mutate: createComment } = useCreateComment();
  const { currentUser = {} } = useAuth();
  const { id, image } = currentUser;

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      text: comment,
      authorId: id, // of the comment
      postId,
    };

    createComment({
      postId,
      userId: currentUser.id,
      postAuthorId: postAuthorId,
      comment: newComment,
    });

    setComment("");
  }

  return (
    <form className={styles["add-comment"]} onSubmit={handleSubmit}>
      <ProfileIcon src={image} alt="user" size="small" />
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
