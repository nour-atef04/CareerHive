import { useState } from "react";
import styles from "./ProfileStats.module.css";
import ProfileStatsModal from "./ProfileStatsModal";
import Button from "../ui/Button";
import {
  useFollowUser,
  useUnfollowUser,
  useUserFollowings,
} from "../../hooks/useUsers";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfileStats({
  className,
  followersCount,
  followingsCount,
  user,
}) {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const { currentUser } = useAuth();
  const { id, name } = user || {};

  const { data: currentUserFollowings } = useUserFollowings(currentUser.id);
  const currentUserFollowingsIds = currentUserFollowings.map((user) => user.id);
  const isFollowing = currentUserFollowingsIds.includes(id);

  const { mutate: followUser } = useFollowUser();
  const { mutate: unFollowUser } = useUnfollowUser();

  function handleClick() {
    if (isFollowing) {
      unFollowUser({ userIdToUnfollow: id, userName: name });
    } else {
      followUser({ userIdToFollow: id, userName: name });
    }
  }

  const isMyProfile = currentUser.id === id;

  return (
    <>
      <div className={`${styles["profile-stats"]} ${className || ""}`}>
        <div className={styles.counts} onClick={() => setOpenModal(true)}>
          <span>{followersCount} followers</span>
          <span> • </span>
          <span>{followingsCount} followings</span>{" "}
        </div>
        <div className={styles["buttons"]}>
          {!isMyProfile && (
            <Button
              onClick={() => navigate(`/messages/${id}`)}
              variant="outline-dark"
              color="brand2"
            >
              Message
            </Button>
          )}
          {!isMyProfile &&
            (isFollowing ? (
              <Button onClick={handleClick} variant="filled">
                Unfollow
              </Button>
            ) : (
              <Button onClick={handleClick} variant="outline-dark">
                Follow
              </Button>
            ))}
        </div>
      </div>
      {openModal && <ProfileStatsModal onClose={() => setOpenModal(false)} />}
    </>
  );
}
