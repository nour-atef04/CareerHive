import styles from "./PeoplePanel.module.css";
import ChatSearch from "./ChatSearch";
import PeopleList from "./PeopleList";
import { useAuth } from "../../../context/AuthContext";
import { useUserFollowings } from "../../../hooks/useUsers";
import { useEffect, useState } from "react";
import Loader from "../../ui/Loader";

export default function PeoplePanel({ showChat, setShowChat }) {
  const { currentUser: user } = useAuth();
  const { data: followings = [], isLoading } = useUserFollowings(user.id);

  const [filteredFollowings, setFilteredFollowings] = useState(followings);
  useEffect(() => {
    setFilteredFollowings(followings);
  }, [setFilteredFollowings, followings]);

  if (isLoading) return <Loader />;

  return (
    <section
      className={`${styles["people-section"]} ${
        showChat && styles["hide-people"]
      }`}
    >
      <ChatSearch
        followingsList={followings}
        setFilteredFollowings={setFilteredFollowings}
      />
      <PeopleList followings={filteredFollowings} setShowChat={setShowChat} />
    </section>
  );
}
