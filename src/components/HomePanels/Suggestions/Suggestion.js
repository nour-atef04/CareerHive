import styles from "./Suggestion.module.css";
import Button from "../../ui/Button";
import { useState } from "react";
import { useFollowUser, useUnfollowUser } from "../../../hooks/useUsers";

export default function Suggestion({ className, suggestion }) {
  const { id, name, position } = suggestion;
  const [followed, setFollowed] = useState(false);
  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();

  function handleFollow() {
    if (!followed) {
      setFollowed(true);
      followUser.mutate(id);
    } else {
      setFollowed(false);
      unfollowUser.mutate(id);
    }
  }

  return (
    <div className={`${className || ""} ${styles["suggestion"]}`}>
      <div className={styles["icon"]}></div>
      <div className={styles["info"]}>
        <p className={styles["name"]}>{name}</p>
        <p className={styles["position"]}>{position}</p>
      </div>
      <Button
        onClick={handleFollow}
        size="sm"
        variant={followed ? "filled" : "outline-dark"}
        className={styles["follow-btn"]}
      >
        {followed ? "−" : "+"}
      </Button>
    </div>
  );
}
