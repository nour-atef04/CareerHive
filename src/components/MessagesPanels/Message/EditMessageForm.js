import { useDispatch } from "react-redux";
import { editMessage } from "../../../redux/slices/chatsSlice";
import { useState } from "react";
import FormInput from "../../FormInput";
import Button from "../../Button";
import styles from "./EditMessageForm.module.css";

export default function EditMessageForm({
  chatId,
  messageId,
  setIsEditing,
  children,
}) {
  const [editedText, setEditedText] = useState(children); // for the edit message controlled input element
  const dispatch = useDispatch();

  function handleEditSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
    dispatch(editMessage({ chatId, messageId, newText: editedText }));
  }

  return (
    <form onSubmit={handleEditSubmit} className={styles["edit-form"]}>
      <FormInput
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
      />
      {editedText !== children && (
        <Button type="submit" size="sm" className={styles["edit-submit-btn"]}>
          Ok
        </Button>
      )}
    </form>
  );
}
