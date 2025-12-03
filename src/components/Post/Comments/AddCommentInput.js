import { useState, forwardRef } from "react";
import styles from "./AddCommentInput.module.css";
import FormInput from "../../ui/FormInput";
import ProfileIcon from "../../ui/ProfileIcon";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/authSlice";
import { addCommentAsync } from "../../../redux/slices/postUiSlice";

const AddCommentInput = forwardRef(function AddCommentInput({ postId }, ref) {
  const user = useSelector(getUser);
  const { id, image, name } = user;
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    dispatch(
      addCommentAsync({
        postId,
        text: comment,
        author: name,
        authorId: id.toString(),
      })
    );
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
