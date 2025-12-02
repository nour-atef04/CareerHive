import { getDateLabel, isSameDay } from "../chatHelperFunctions";
import Message from "../Message/Message";
import ChatEmptyState from "./ChatEmptyState";
import styles from "./ChatMessages.module.css";
import DateSeperator from "./DateSeperator";

export default function ChatMessages({ chat, chatPerson, user }) {
  return (
    <div className={`${styles["chat"]} `}>
      {!chat && <ChatEmptyState chatPerson={chatPerson} />}
      {chat?.messages?.map((message, i) => {
        const msgDate = new Date(message.timestamp);
        // determine if this msg starts a new date section
        let showDateLabel = false;
        if (i === 0) {
          showDateLabel = true;
        } else {
          const prevDate = new Date(chat.messages[i - 1].timestamp);
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
              chatId={chat.id}
              messageId={message.id}
              person={message.sender}
              currentUser={user.name}
              time={message.timestamp}
            >
              {message.text}
            </Message>
          </div>
        );
      })}
    </div>
  );
}
