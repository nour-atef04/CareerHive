import styles from "./PeoplePanel.module.css";
import ChatSearch from "./ChatSearch";
import PeopleList from "./PeopleList";
import { useAuth } from "../../../context/AuthContext";
import { useUserFollowings } from "../../../hooks/useUsers";
import { useUsersChats } from "../../../hooks/useChats";
import { useEffect, useState } from "react";
import Loader from "../../ui/Loader";

export default function PeoplePanel({ showChat, setShowChat }) {
  const { currentUser: user } = useAuth();

  // console.log(user.id);

  const { data: followings = [], isLoadingFollowings } = useUserFollowings(
    user.id
  );

  const { data: usersChats = [], isLoadingChats } = useUsersChats(user.id);

  // console.log(usersChats);
  // console.log(followings);

  const [peopleToShow, setPeopleToShow] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);

  // Merge followings + chat participants
  useEffect(() => {
    if (!followings || !usersChats) return;

    // new Set( ... ) for fast lookup
    const followingIds = new Set(followings.map((f) => f.id));

    // Include all followings + chat participants not in followings
    const combined = [
      ...followings,
      ...usersChats.filter((u) => !followingIds.has(u.id)),
    ];

    setPeopleToShow(combined);
    setFilteredPeople(combined); // initialize filtered list
  }, [followings, usersChats]);

  if (isLoadingFollowings || isLoadingChats) return <Loader />;

  // console.log(filteredPeople);

  return (
    <section
      className={`${styles["people-section"]} ${
        showChat ? styles["hide-people"] : ""
      }`}
    >
      <ChatSearch
        followingsList={peopleToShow} // use merged list here
        setFilteredFollowings={setFilteredPeople} // filtered state
      />
      <PeopleList followings={filteredPeople} setShowChat={setShowChat} />
    </section>
  );
}
