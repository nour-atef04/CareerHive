import Button from "../../ui/Button";
import MessageOptions from "./MessageOptions";
import styles from "./DeleteConfirmation.module.css";
import { useDeleteMessage } from "../../../hooks/useChats";

export default function DeleteConfirmation({
  chatId,
  messageId,
  deleteConfirmation,
  setDeleteConfirmation,
  setLockOptionsOpen,
  setHovered,
  setIsEditing,
}) {
  const { mutate: deleteMessage, isLoading: isDeleting } = useDeleteMessage();

  return (
    <span className={styles["options-box"]}>
      {deleteConfirmation ? (
        <div className={styles["delete-confirm"]}>
          <p>Sure want to delete?</p>

          <div className={styles["delete-buttons"]}>
            <Button
              size="sm"
              onClick={() => {
                setDeleteConfirmation(false);
                setLockOptionsOpen(false);
              }}
            >
              Cancel
            </Button>

            <Button
              size="sm"
              disabled={isDeleting}
              onClick={() => {
                // dispatch(deleteMessage({ chatId, messageId }));
                deleteMessage(
                  { chatId, messageId },
                  {
                    onSuccess: () => {
                      setLockOptionsOpen(false);
                      setHovered(false);
                      setDeleteConfirmation(false);
                    },
                  }
                );
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <MessageOptions
          setIsEditing={setIsEditing}
          setDeleteConfirmation={setDeleteConfirmation}
          setLockOptionsOpen={setLockOptionsOpen}
        />
      )}
    </span>
  );
}
