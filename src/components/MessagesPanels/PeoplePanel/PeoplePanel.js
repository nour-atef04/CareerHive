import styles from "./PeoplePanel.module.css";
import ChatSearch from "./ChatSearch";
import PeopleList from "./PeopleList";
import { useAuth } from "../../../context/AuthContext";
import { useUserFollowings } from "../../../hooks/useUsers";
import { useUsersChats } from "../../../hooks/useChats";
import { useMemo, useState } from "react";
import Loader from "../../ui/Loader";

export default function PeoplePanel({ showChat, setShowChat }) {
  const { currentUser: user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: followings = [], isLoadingFollowings } = useUserFollowings(
    user.id,
  );
  const { data: usersChats = [], isLoadingChats } = useUsersChats(user.id);

  // merge the lists
  const peopleToShow = useMemo(() => {
    if (!followings || !usersChats) return [];

    // ids of my followings
    const followingIds = new Set(followings.map((f) => f.id));

    // extract participant data from chats where the person is NOT followed
    const chatParticipantsNotFollowed = usersChats
      .map((chat) => chat.participant)
      .filter((person) => person && !followingIds.has(person.id));

    // flatten both into one list of user objects
    return [...followings, ...chatParticipantsNotFollowed];
  }, [followings, usersChats]);

  // derive the filtered list directly from peopleToShow and searchQuery
  const filteredPeople = useMemo(() => {
    if (!searchQuery) return peopleToShow;

    return peopleToShow.filter((person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [peopleToShow, searchQuery]);
  if (isLoadingFollowings || isLoadingChats) return <Loader />;

  return (
    <section
      className={`${styles["people-section"]} ${
        showChat ? styles["hide-people"] : ""
      }`}
    >
      <ChatSearch
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      <PeopleList followings={filteredPeople} setShowChat={setShowChat} />
    </section>
  );
}
