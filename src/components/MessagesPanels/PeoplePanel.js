import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MessagePerson from "./MessagePerson";
import styles from "./PeoplePanel.module.css";

const MAX_PEOPLE = 9;

export default function PeoplePanel({
  showChat,
  setShowChat,
  onSetChatPerson,
}) {
  const { state } = useAuth();
  const { following } = state;
  const [searchChat, setSearchChat] = useState("");
  const [followingList, setFollowingList] = useState(following);

  function handleInputChange(e) {
    const value = e.target.value;
    setSearchChat(value);
    const filtered = following.filter((person) =>
      person.toLowerCase().includes(value.toLowerCase())
    );

    setFollowingList(filtered);
  }

  return (
    <section
      className={`${styles["people-section"]} ${
        showChat && styles["hide-people"]
      }`}
    >
      <div className={styles["search"]}>
        <input
          type="text"
          placeholder="Search chat"
          value={searchChat}
          onChange={handleInputChange}
        />
      </div>
      {followingList.map(
        (person, i) =>
          i < MAX_PEOPLE && (
            <MessagePerson
              name={person}
              onClick={() => {
                setShowChat(true);
                onSetChatPerson(person);
              }}
            />
          )
      )}
    </section>
  );
}
