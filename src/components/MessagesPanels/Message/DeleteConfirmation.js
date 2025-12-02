import Button from "../../ui/Button";
import MessageOptions from "./MessageOptions";
import styles from "./DeleteConfirmation.module.css";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../../../redux/slices/chatsSlice";

export default function DeleteConfirmation({
  chatId,
  messageId,
  deleteConfirmation,
  setDeleteConfirmation,
  setLockOptionsOpen,
  setHovered,
  setIsEditing,
}) {
  const dispatch = useDispatch();

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
              onClick={() => {
                dispatch(deleteMessage({ chatId, messageId }));
                setLockOptionsOpen(false);
                setHovered(false);
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
