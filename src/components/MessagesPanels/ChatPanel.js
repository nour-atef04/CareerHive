import { useEffect, useState } from "react";
import styles from "./ChatPanel.module.css";
import Message from "./Message";
import NewMessageForm from "./NewMessageForm";
import MessagePerson from "./MessagePerson";

// pretend database
const initialChats = {
  person1: [
    { person: "2", message: "Hey!", time: new Date().toISOString() },
    { person: "1", message: "Hi!", time: new Date().toISOString() },
  ],
  person2: [
    {
      person: "2",
      message: "Hi, how are you?",
      time: new Date().toISOString(),
    },
  ],
};

function createTimestamp() {
  return new Date().toISOString();
}

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
  const [allChats, setAllChats] = useState(initialChats);
  const [messages, setMessages] = useState([]);

  //load messages whenever chatPerson changes
  useEffect(() => {
    setMessages(allChats[chatPerson] || []);
  }, [chatPerson, allChats]);

  function handleAddNewMessage(newMessage) {
    const newMessageObj = {
      person: "1",
      message: newMessage,
      time: createTimestamp(),
    };
    setAllChats((prev) => ({
      ...prev,
      [chatPerson]: [...(prev[chatPerson] || []), newMessageObj],
    }));

    setMessages((prev) => [...prev, newMessageObj]);
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
        {messages?.map((message, i) => {
          const msgDate = new Date(message.time);
          // determine if this msg starts a new date section
          let showDateLabel = false;
          if (i === 0) {
            showDateLabel = true;
          } else {
            const prevDate = new Date(messages[i - 1].time);
            if (!isSameDay(prevDate, msgDate)) {
              showDateLabel = true;
            }
          }
          return (
            <div key={i}>
              {showDateLabel && (
                <div className={styles["date-separator"]}>
                  {getDateLabel(msgDate)}
                </div>
              )}

              <Message person={message.person} time={message.time}>
                {message.message}
              </Message>
            </div>
          );
        })}
      </div>
      <NewMessageForm onAddNewMessage={handleAddNewMessage} />
    </section>
  );
}
