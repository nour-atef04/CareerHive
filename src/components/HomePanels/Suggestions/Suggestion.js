import styles from "./Suggestion.module.css";
import Button from "../../ui/Button";
import PersonLi from "../../ui/PersonLi";
import { useFollowUser, useUnfollowUser } from "../../../hooks/useUsers";
import Spinner from "../../ui/Spinner";

export default function Suggestion({ isFollowing, suggestion }) {
  const { mutate: followUser, isLoading: isFollowingUser } = useFollowUser();
  const { mutate: unfollowUser, isLoading: isUnfollowingUser } =
    useUnfollowUser();

  const isLoading = isFollowingUser || isUnfollowingUser;

  function handleFollow() {
    if (isLoading) return; // prevent double clicks

    if (!isFollowing) {
      // setFollowed(true);
      followUser({
        userIdToFollow: suggestion.id,
        userName: suggestion.name,
      });
    } else {
      // setFollowed(false);
      unfollowUser({
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
        variant={isFollowing ? "filled" : "outline-dark"}
        className={styles["follow-btn"]}
        disabled={isLoading}
        // accessibility for screen readers
        aria-label={`${isFollowing ? "Unfollow" : "Follow"} ${suggestion.name}`}
      >
        {isLoading ? (
          <Spinner
            size="small"
            color={isFollowing ? "var(--color-dark--1)" : "white"}
          />
        ) : (
          <span>{isFollowing ? "−" : "+"}</span>
        )}
      </Button>
    </PersonLi>
  );
}
