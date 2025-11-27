import { useState } from "react";
import styles from "./ChatPanel.module.css";
import Message from "./Message";
import NewMessageForm from "./NewMessageForm";

const fakeMessages = [
  {
    person: "2",
    message: "Hello!",
  },
  {
    person: "2",
    message: "How are you?",
  },
  {
    person: "1",
    message: "I'm good! How are you?",
  },
];

export default function ChatPanel({ showChat, setShowChat }) {
  const [messages, setMessages] = useState(fakeMessages);

  function handleAddNewMessage(newMessage) {
    const newMessageObj = { person: "1", message: newMessage };
    setMessages((messages) => [...messages, newMessageObj]);
  }
  return (
    <section
      className={`${styles["chat-section"]} ${showChat && styles["show-chat"]}`}
    >
      <div className={`${styles["chat"]} `}>
        <button
          className={styles["back-button"]}
          onClick={() => setShowChat(false)}
        >
          Back
        </button>
        {messages.map((message) => (
          <Message person={message.person}>{message.message}</Message>
        ))}
      </div>
      <NewMessageForm onAddNewMessage={handleAddNewMessage} />
    </section>
  );
}
