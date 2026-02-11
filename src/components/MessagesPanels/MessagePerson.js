import { useNavigate } from "react-router-dom";
import ProfileIcon from "../ui/ProfileIcon";
import styles from "./MessagePerson.module.css";
import { useChatByParticipantsId, useLastMessage } from "../../hooks/useChats";
import { useAuth } from "../../context/AuthContext";

export default function MessagePerson({
  onClick,
  id,
  image,
  name,
  className,
  mode = "chat", // list | chat
}) {
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const { data: chatId, isLoading: isLoadingChatId } = useChatByParticipantsId(
    id,
    currentUser?.id,
  );

  const { data: lastMsg, isLoading: isLoadingMessage } = useLastMessage(chatId);

  const isLoading = isLoadingChatId || isLoadingMessage;
  const isUnread =
    lastMsg && !lastMsg.read && lastMsg.senderId !== currentUser?.id;

  // format text
  const previewText = lastMsg?.text?.startsWith("http")
    ? "Sent a link"
    : lastMsg?.text;

  // formate time
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // check if "I" sent it
  const prefix = lastMsg?.senderId === currentUser?.id ? "You: " : "";

  return (
    <div
      role="button"
      className={`${styles["message-person"]} ${className || ""}`}
      onClick={onClick}
      aria-label={`Chat with ${name}`}
    >
      <ProfileIcon
        src={image}
        alt="user profile"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/profile/${id}`);
        }}
      />
      <div className={styles.info}>
        <p>{name}</p>

        {mode === "list" && (
          <div className={styles["last-message"]}>
            <p
              className={`${styles["last-message-text"]} ${isUnread ? styles["unread-text"] : ""}`}
            >
              {isUnread && mode === "list" && (
                <div
                  className={styles["unread-dot"]}
                  aria-label="Unread message"
                ></div>
              )}
              {isLoading
                ? "..."
                : lastMsg
                  ? `${prefix}${previewText}`
                  : "No messages"}
            </p>
            <p className={styles["last-message-time"]}>
              {lastMsg ? formatTime(lastMsg.createdAt) : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
