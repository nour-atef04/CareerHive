import styles from "./PeoplePanel.module.css";
import ChatSearch from "./ChatSearch";
import PeopleList from "./PeopleList";
import { useAuth } from "../../../context/AuthContext";
import { useUsersChats } from "../../../hooks/useChats";
import { useMemo, useState } from "react";
import Loader from "../../ui/Loader";

export default function PeoplePanel({ showChat, setShowChat }) {
  const { currentUser: user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: usersChats = [], isLoadingChats } = useUsersChats(user.id);

  const chatPeople = useMemo(() => {
    if (!usersChats) return [];

    return usersChats.map((chat) => chat.participant).filter(Boolean);
  }, [usersChats]);

  // derive the filtered list directly from peopleToShow and searchQuery
  const filteredPeople = useMemo(() => {
    if (!searchQuery) return chatPeople;

    return chatPeople.filter((person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [chatPeople, searchQuery]);

  if (isLoadingChats) return <Loader />;

  return (
    <section
      className={`${styles["people-section"]} ${
        showChat ? styles["hide-people"] : ""
      }`}
    >
      <ChatSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <PeopleList people={filteredPeople} setShowChat={setShowChat} />
    </section>
  );
}
