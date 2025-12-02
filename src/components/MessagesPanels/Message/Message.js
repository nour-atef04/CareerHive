import { useState } from "react";
import styles from "./Message.module.css";
import Button from "../../Button";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../../../redux/slices/chatsSlice";
import MessageOptions from "./MessageOptions";
import EditMessageForm from "./EditMessageForm";
import { formatFullTimestamp } from "../chatHelperFunctions";
import DeleteConfirmation from "./DeleteConfirmation";

export default function Message({
  chatId,
  messageId,
  person,
  currentUser,
  time,
  children,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [hovered, setHovered] = useState(false); // to hover on "..."
  const [lockOptionsOpen, setLockOptionsOpen] = useState(false); // when user clicks delete, box stays
  const [deleteConfirmation, setDeleteConfirmation] = useState(false); // for when user clicks delete

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
              <DeleteConfirmation
                chatId={chatId}
                messageId={messageId}
                deleteConfirmation={deleteConfirmation}
                setDeleteConfirmation={setDeleteConfirmation}
                setLockOptionsOpen={setLockOptionsOpen}
                setHovered={setHovered}
                setIsEditing={setIsEditing}
              />
            )}
          </div>
        )}

        {isEditing ? (
          <EditMessageForm
            chatId={chatId}
            messageId={messageId}
            setIsEditing={setIsEditing}
          >
            {children}
          </EditMessageForm>
        ) : (
          <p>{children}</p>
        )}
        <p className={styles["time"]}>{formatFullTimestamp(time)}</p>
      </div>
    </>
  );
}
