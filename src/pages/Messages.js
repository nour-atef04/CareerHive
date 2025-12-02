import { useState } from "react";
import styles from "./Messages.module.css";
import PeoplePanel from "../components/MessagesPanels/PeoplePanel/PeoplePanel";
import ChatPanel from "../components/MessagesPanels/ChatPanel/ChatPanel";

export default function Messages() {
  const [showChat, setShowChat] = useState(false);
  const [chatPerson, setChatPerson] = useState("John Doe");

  return (
    <main className={styles["main"]}>
      <section className={styles["messages-page"]}>
        <PeoplePanel
          showChat={showChat}
          setShowChat={setShowChat}
          onSetChatPerson={setChatPerson}
        />
        <ChatPanel
          showChat={showChat}
          setShowChat={setShowChat}
          chatPerson={chatPerson}
        />
      </section>
    </main>
  );
}
