import { useState } from "react";
import styles from "./Messages.module.css";
import PeoplePanel from "../components/MessagesPanels/PeoplePanel/PeoplePanel";
import ChatPanel from "../components/MessagesPanels/ChatPanel/ChatPanel";
import Panel from "../components/ui/Panel"

export default function Messages() {
  const [showChat, setShowChat] = useState(false);
  const [chatPerson, setChatPerson] = useState("John Doe");

  return (
    <main className={styles["main"]}>
      <Panel className={styles["messages-page"]}>
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
      </Panel>
    </main>
  );
}
