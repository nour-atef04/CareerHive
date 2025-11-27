import { useState } from "react";
import styles from "./NewMessageForm.module.css";

export default function NewMessageForm({ onAddNewMessage }) {
  const [newMessage, setNewMessage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onAddNewMessage(newMessage);
    setNewMessage("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles["new-message"]}
        type="text"
        placeholder="Write something..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
    </form>
  );
}
