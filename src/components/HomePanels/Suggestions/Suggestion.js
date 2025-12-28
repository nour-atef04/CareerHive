import styles from "./Suggestion.module.css";
import Button from "../../ui/Button";
import PersonLi from "../../ui/PersonLi";
import { useState } from "react";
import { useFollowUser, useUnfollowUser } from "../../../hooks/useUsers";

export default function Suggestion({ className, isFollowing, suggestion }) {
  console.log(suggestion);
  const [followed, setFollowed] = useState(isFollowing);
  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();

  function handleFollow() {
    if (!followed) {
      setFollowed(true);
      followUser.mutate({
        userIdToFollow: suggestion.id,
        userName: suggestion.name,
      });
    } else {
      setFollowed(false);
      unfollowUser.mutate({
        userIdToUnfollow: suggestion.id,
        userName: suggestion.name,
      });
    }
  }

  return (
    <PersonLi person={suggestion} className={styles.person}>
      <Button
        onClick={handleFollow}
        size="sm"
        variant={followed ? "filled" : "outline-dark"}
        className={styles["follow-btn"]}
      >
        {followed ? "−" : "+"}
      </Button>
    </PersonLi>
  );
}
