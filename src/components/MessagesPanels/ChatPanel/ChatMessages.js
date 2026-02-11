import { getDateLabel, isSameDay } from "../chatHelperFunctions";
import Message from "../Message/Message";
import ChatEmptyState from "./ChatEmptyState";
import styles from "./ChatMessages.module.css";
import DateSeperator from "./DateSeperator";

export default function ChatMessages({ messages = [], chatPerson, user }) {
  const hasMessages = messages && messages.length > 0;

  return (
    <div className={`${styles["chat"]} `} role="log">
      {!hasMessages && <ChatEmptyState chatPerson={chatPerson?.name} />}
      {messages.map((message, i) => {
        // console.log(message);

        const msgDate = new Date(message.createdAt);
        // determine if this msg starts a new date section
        let showDateLabel = false;
        if (i === 0) {
          showDateLabel = true;
        } else {
          const prevDate = new Date(messages[i - 1].createdAt);
          if (!isSameDay(prevDate, msgDate)) {
            showDateLabel = true;
          }
        }
        return (
          <div key={message.id}>
            {showDateLabel && (
              <DateSeperator>{getDateLabel(msgDate)}</DateSeperator>
            )}

            <Message
              chatId={message.chatId}
              messageId={message.id}
              person={message.senderId}
              currentUser={user.id}
              time={message.createdAt}
            >
              {message.text}
            </Message>
          </div>
        );
      })}
    </div>
  );
}
