import { getDateLabel, isSameDay } from "../chatHelperFunctions";
import Message from "../Message/Message";
import ChatEmptyState from "./ChatEmptyState";
import styles from "./ChatMessages.module.css";
import DateSeperator from "./DateSeperator";

export default function ChatMessages({ chat, chatPerson, user }) {
  return (
    <div className={`${styles["chat"]} `}>
      {!chat && <ChatEmptyState chatPerson={chatPerson.name} />}
      {chat?.messages?.map((message, i) => {
        // console.log(message);

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
              person={message.senderId}
              currentUser={user.id}
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