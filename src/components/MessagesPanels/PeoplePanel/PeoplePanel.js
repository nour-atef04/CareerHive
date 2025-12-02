import { useState } from "react";
import styles from "./PeoplePanel.module.css";
import { useSelector } from "react-redux";
import { getFollowings } from "../../../redux/slices/followSlice";
import ChatSearch from "./ChatSearch";
import PeopleList from "./PeopleList";

export default function PeoplePanel({
  showChat,
  setShowChat,
  onSetChatPerson,
}) {
  const following = useSelector(getFollowings);
  const [followingList, setFollowingList] = useState(following);

  return (
    <section
      className={`${styles["people-section"]} ${
        showChat && styles["hide-people"]
      }`}
    >
      <ChatSearch following={following} setFollowingList={setFollowingList} />
      <PeopleList
        followingList={followingList}
        setShowChat={setShowChat}
        onSetChatPerson={onSetChatPerson}
      />
    </section>
  );
}
