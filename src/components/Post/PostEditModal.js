import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../../redux/slices/postsSlice";
import styles from "./PostEditModal.module.css";
import Button from "../ui/Button";

export default function PostEditModal({ post, onClose }) {
  const dispatch = useDispatch();
  const [newText, setNewText] = useState(post.text);
  const textareaRef = useRef(null);

  // Autofocus on textarea when modal opens
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  function handleSave() {
    // console.log({ postId: post.id, newText });
    dispatch(editPost({ postId: post.id, newText }));
    onClose();
  }

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal"]}>
        <h2>Edit Post</h2>
        <textarea
          ref={textareaRef}
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          rows={5}
          className={styles["textarea"]}
        />
        <div className={styles["buttons"]}>
          <Button
            variant={
              newText.trim() === post.text.trim() || newText.trim() === ""
                ? "disabled"
                : "filled"
            }
            onClick={handleSave}
          >
            Save
          </Button>
          <Button variant="outline-dark" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
