import styles from "./Suggestion.module.css";
import Button from "../../ui/Button";
import PersonLi from "../../ui/PersonLi";
import { useFollowUser, useUnfollowUser } from "../../../hooks/useUsers";
import Spinner from "../../ui/Spinner";

export default function Suggestion({ isFollowing, suggestion }) {
  // const [followed, setFollowed] = useState(isFollowing);
  const { mutate: followUser, isLoading: isFollowingUser } = useFollowUser();
  const { mutate: unfollowUser, isLoading: isUnfollowingUser } =
    useUnfollowUser();

  function handleFollow() {
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
      >
        {/* {followed ? "−" : "+"} */}
        {isFollowing ? (
          isFollowingUser ? (
            <Spinner size="small" color="white" />
          ) : (
            "-"
          )
        ) : isUnfollowingUser ? (
          <Spinner size="small" color="var(--color-brand--1)" />
        ) : (
          "+"
        )}
      </Button>
    </PersonLi>
  );
}
