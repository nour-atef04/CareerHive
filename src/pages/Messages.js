import { useState } from "react";
import styles from "./Messages.module.css";
import PeoplePanel from "../components/MessagesPanels/PeoplePanel/PeoplePanel";
import ChatPanel from "../components/MessagesPanels/ChatPanel/ChatPanel";
import Panel from "../components/ui/Panel"
import { useParams } from "react-router-dom";

export default function Messages() {
  const [showChat, setShowChat] = useState(false);
  const {chatPerson} = useParams();

  return (
    <main className={styles["main"]}>
      <Panel className={styles["messages-page"]}>
        <PeoplePanel
          showChat={showChat}
          setShowChat={setShowChat}
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
