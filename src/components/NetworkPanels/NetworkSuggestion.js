import { IoMdAdd } from "react-icons/io";
import Button from "../ui/Button";
import Panel from "../ui/Panel";
import ProfileIconHeader from "../ui/ProfileIconHeader";
import ProfileNamePosition from "../ui/ProfileNamePosition";
import styles from "./NetworkSuggestion.module.css";
import { FaMinus } from "react-icons/fa6";
import { useState } from "react";
import { useFollowUser, useUnfollowUser } from "../../hooks/useUsers";

export default function NetworkSuggestion({ user }) {
  const [followedUser, setFollowedUser] = useState(false);
  const { mutate: followUser, isLoading: isFollowingUser } = useFollowUser();
  const { mutate: unFollowUser, isLoading: isUnfollowingUser } =
    useUnfollowUser();

  function handleClick(user) {
    if (followedUser) {
      setFollowedUser(false);
      unFollowUser({ userIdToUnfollow: user.id, userName: user.name });
    } else {
      setFollowedUser(true);
      followUser({ userIdToFollow: user.id, userName: user.name });
    }
  }

  return (
    <div className={styles["suggestion"]}>
      <Panel className={styles["suggestion-card"]}>
        <ProfileIconHeader userImage={user.image} type="centered" />
        <div className={styles["suggestion-body"]}>
          <ProfileNamePosition
            className={styles["profile-info"]}
            name={user.name}
            position={user.position}
          />
        </div>
        <Button
          className={styles.btn}
          size="sm"
          variant={followedUser ? "filled" : "outline-dark"}
          onClick={() => handleClick(user)}
        >
          {!followedUser ? (
            <>
              <IoMdAdd />
              Follow
            </>
          ) : (
            <>
              <FaMinus />
              Unfollow
            </>
          )}
        </Button>
      </Panel>
    </div>
  );
}
