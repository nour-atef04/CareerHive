import { useEffect, useRef, useState } from "react";
import styles from "./PostEditModal.module.css";
import Button from "../ui/Button";
import { useEditPost } from "../../hooks/usePosts";
import Modal from "../ui/Modal";

export default function PostEditModal({ post, onClose }) {
  const [newText, setNewText] = useState(post.text);
  const textareaRef = useRef(null);
  const editMutation = useEditPost();

  // Autofocus on textarea when modal opens
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  function handleSave() {
    editMutation.mutate({ postId: post.id, newText });
    onClose();
  }

  const isDisabled =
    newText.trim() === "" || newText.trim() === post.text.trim();

  return (
    <Modal onClose={onClose}>
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
          variant={isDisabled ? "disabled" : "filled"}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button variant="outline-dark" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
