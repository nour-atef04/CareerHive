import styles from "./AddCommentInput.module.css";
import FormInput from "../FormInput";

export default function AddCommentInput({ ref }) {
  return (
    <div className={styles["add-comment"]}>
      <div className={styles["comment-icon"]}></div>
      <FormInput
        ref={ref}
        className={styles["add-comment-input"]}
        placeholder="Add a comment..."
      />
    </div>
  );
}
