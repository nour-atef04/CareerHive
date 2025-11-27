import { useAuth } from "../../context/AuthContext";
import MessagePerson from "./MessagePerson";
import styles from "./PeoplePanel.module.css";

const MAX_PEOPLE = 10;

export default function PeoplePanel({ showChat, setShowChat }) {
  const { state } = useAuth();
  const { following } = state;

  return (
    <section
      className={`${styles["people-section"]} ${
        showChat && styles["hide-people"]
      }`}
    >
      {Array.from({
        length: following > MAX_PEOPLE ? MAX_PEOPLE : following,
      }).map((_, index) => (
        <MessagePerson onClick={()=>setShowChat(true)}/>
      ))}
    </section>
  );
}
