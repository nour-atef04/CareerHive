import { useState } from "react";
import styles from "./PeoplePanel.module.css";
// import { useSelector } from "react-redux";
// import { getFollowings } from "../../../redux/slices/followSlice";
import ChatSearch from "./ChatSearch";
import PeopleList from "./PeopleList";
import { useAuth } from "../../../context/AuthContext";

export default function PeoplePanel({ showChat, setShowChat }) {
  // const following = useSelector(getFollowings);
  const { currentUser: user } = useAuth();
  const { name, position, followers = [], followings = [] } = user || {};
  const [followingList, setFollowingList] = useState(followings);

  return (
    <section
      className={`${styles["people-section"]} ${
        showChat && styles["hide-people"]
      }`}
    >
      <ChatSearch following={followings} setFollowingList={setFollowingList} />
      <PeopleList followingList={followingList} setShowChat={setShowChat} />
    </section>
  );
}
