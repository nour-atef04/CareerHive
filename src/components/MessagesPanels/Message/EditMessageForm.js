import { useState } from "react";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import styles from "./EditMessageForm.module.css";
import { useEditMessage } from "../../../hooks/useChats";

export default function EditMessageForm({
  chatId,
  messageId,
  setIsEditing,
  children,
}) {
  const [editedText, setEditedText] = useState(children); // for the edit message controlled input element

  const { mutate: editMessage, isLoading: isEditing } = useEditMessage();

  function handleEditSubmit(e) {
    e.preventDefault();
    // dispatch(editMessage({ chatId, messageId, newText: editedText }));
    editMessage(
      { chatId, messageId, newText: editedText },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  }

  const isChanged =
    editedText.trim() !== children.trim() && editedText.trim() !== "";

  return (
    <form onSubmit={handleEditSubmit} className={styles["edit-form"]}>
      <FormInput
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
      />
      {isChanged && (
        <Button
          type="submit"
          size="sm"
          disable={isEditing}
          className={styles["edit-submit-btn"]}
        >
          Ok
        </Button>
      )}
    </form>
  );
}
