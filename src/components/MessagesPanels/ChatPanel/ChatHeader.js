import MessagePerson from "../MessagePerson";
import styles from "./ChatHeader.module.css";

export default function ChatHeader({ chatPerson, setShowChat }) {
  return (
    <>
      <MessagePerson name={chatPerson.name} className={styles["chat-person"]} />
      <button
        className={styles["back-button"]}
        onClick={() => setShowChat(false)}
      >
        ←
      </button>
    </>
  );
}
