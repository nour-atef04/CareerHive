import { getDateLabel, isSameDay } from "./chatHelperFunctions";

export default function ChatMessage({
  message,
  prevMessage,
  currentUser,
  editOptionsOpen,
  setEditOptionsOpen,
}) {
  const msgDate = new Date(message.timestamp);
  const showDateLabel =
    !prevMessage || !isSameDay(new Date(prevMessage.timestamp), msgDate);

  return (
    <div key={message.id}>
      {showDateLabel && (
        <div className={styles["date-separator"]}>{getDateLabel(msgDate)}</div>
      )}

      <Message
        messageId={message.id}
        person={message.sender}
        currentUser={user.name}
        time={message.timestamp}
        onClickEditBtn={() =>
          setEditOptionsOpen((editOptionsOpen) =>
            editOptionsOpen === message.id ? null : message.id
          )
        }
        editOptionsOpen={editOptionsOpen}
      >
        {message.text}
      </Message>
    </div>
  );
}
