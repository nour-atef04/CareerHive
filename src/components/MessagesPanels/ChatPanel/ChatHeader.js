import MessagePerson from "../MessagePerson";
import styles from "./ChatHeader.module.css";
import { BiArrowBack } from "react-icons/bi";

export default function ChatHeader({ chatPerson, setShowChat }) {
  return (
    <header>
      <MessagePerson
        id={chatPerson.id}
        name={chatPerson.name}
        image={chatPerson.image}
        className={styles["chat-person"]}
      />
      <button
        className={styles["back-button"]}
        onClick={() => setShowChat(false)}
        aria-label="Back to messages list"
      >
        <BiArrowBack aria-hidden="true" />
      </button>
    </header>
  );
}
