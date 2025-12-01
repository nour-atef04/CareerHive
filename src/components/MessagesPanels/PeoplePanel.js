import { useState } from "react";
import MessagePerson from "./MessagePerson";
import styles from "./PeoplePanel.module.css";
import { useSelector } from "react-redux";
import { getFollowings } from "../../redux/slices/followSlice";

const MAX_PEOPLE = 9;

export default function PeoplePanel({
  showChat,
  setShowChat,
  onSetChatPerson,
}) {
  const [searchChat, setSearchChat] = useState("");

  const following = useSelector(getFollowings);
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
