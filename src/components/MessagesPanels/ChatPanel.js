import { useEffect, useRef } from "react";
import styles from "./ChatPanel.module.css";
import Message from "./Message";
import NewMessageForm from "./NewMessageForm";
import MessagePerson from "./MessagePerson";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slices/authSlice";
import {
  createChat,
  loadChats,
  selectChatByParticipants,
  sendMessage,
} from "../../redux/slices/chatsSlice";

function isSameDay(d1, d2) {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

function getDateLabel(date) {
  const today = new Date();
  const msgDate = new Date(date);

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(msgDate, today)) return "Today";
  if (isSameDay(msgDate, yesterday)) return "Yesterday";

  // o.w. return dd/mm/yyyy
  const day = msgDate.getDate().toString().padStart(2, "0");
  const month = (msgDate.getMonth() + 1).toString().padStart(2, "0");
  const year = msgDate.getFullYear();

  return `${day}/${month}/${year}`;
}

export default function ChatPanel({ chatPerson, showChat, setShowChat }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const chat = useSelector((state) =>
    selectChatByParticipants(state, user.name, chatPerson)
  );

  // load messages on mount
  useEffect(() => {
    dispatch(loadChats());
  }, [dispatch]);

  const chatRef = useRef(null);

  // scroll to bottom when messages change
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [chat?.messages]);

  function handleAddNewMessage(text) {
    if (!chat) {
      dispatch(
        createChat({
          sender: user.name,
          receiver: chatPerson,
          text,
        })
      );
      return;
    }

    dispatch(
      sendMessage({
        chatId: chat.id,
        sender: user.name,
        text,
      })
    );
  }

  return (
    <section
      className={`${styles["chat-section"]} ${showChat && styles["show-chat"]}`}
    >
      <MessagePerson name={chatPerson} className={styles["chat-person"]} />
      <div className={`${styles["chat"]} `}>
        <button
          className={styles["back-button"]}
          onClick={() => setShowChat(false)}
        >
          ←
        </button>
        {!chat && (
          <div className={styles["date-separator"]}>
            No messages yet. Say Hi to {chatPerson}!
          </div>
        )}
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
                <div className={styles["date-separator"]}>
                  {getDateLabel(msgDate)}
                </div>
              )}

              <Message
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

      <NewMessageForm onAddNewMessage={handleAddNewMessage} />
    </section>
  );
}
