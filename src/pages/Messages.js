import { useState } from "react";
import styles from "./Messages.module.css";
import PeoplePanel from "../components/MessagesPanels/PeoplePanel";
import ChatPanel from "../components/MessagesPanels/ChatPanel";

export default function Messages() {
  const [showChat, setShowChat] = useState(false);

  return (
    <main className={styles["main"]}>
      <section className={styles["messages-page"]}>
        <PeoplePanel showChat={showChat} setShowChat={setShowChat} />
        <ChatPanel showChat={showChat} setShowChat={setShowChat} />
      </section>
    </main>
  );
}
