import { useState } from "react";
import styles from "./Message.module.css";
import FormInput from "../FormInput";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { deleteMessage, editMessage } from "../../redux/slices/chatsSlice";

function formatFullTimestamp(isoString) {
  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const mins = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} · ${hours}:${mins}`;
}

export default function Message({
  chatId,
  messageId,
  person,
  currentUser,
  time,
  children,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(children); // for the edit message controlled input element
  const [hovered, setHovered] = useState(false); // to hover on "..."
  const [lockOptionsOpen, setLockOptionsOpen] = useState(false); // when user clicks delete, box stays
  const [deleteConfirmation, setDeleteConfirmation] = useState(false); // for when user clicks delete

  const dispatch = useDispatch();

  function handleEditSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
    dispatch(editMessage({ chatId, messageId, newText: editedText }));
  }

  const messageStyle =
    person === currentUser
      ? styles["my-message"]
      : styles["message-other-person"];

  return (
    <>
      <div className={messageStyle}>
        {person === currentUser && (
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              if (!lockOptionsOpen) {
                setHovered(false);
                setDeleteConfirmation(false);
              }
            }}
          >
            <span className={styles["edit-btn"]}>...</span>

            {hovered && (
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
                  <>
                    <span
                      className={styles["option"]}
                      onClick={() => setIsEditing((isEditing) => !isEditing)}
                    >
                      Edit
                    </span>
                    <span
                      className={styles["option"]}
                      onClick={() => {
                        setDeleteConfirmation(true);
                        setLockOptionsOpen(true);
                      }}
                    >
                      Delete
                    </span>
                  </>
                )}
              </span>
            )}
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleEditSubmit} className={styles["edit-form"]}>
            <FormInput
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            {editedText !== children && (
              <Button
                type="submit"
                size="sm"
                className={styles["edit-submit-btn"]}
              >
                Ok
              </Button>
            )}
          </form>
        ) : (
          <p>{children}</p>
        )}
        <p className={styles["time"]}>{formatFullTimestamp(time)}</p>
      </div>
    </>
  );
}
