import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EditLogoutButtons from "./EditLogoutButtons";
import FollowMessageButtons from "./FollowMessageButtons";
import styles from "./ProfileStats.module.css";
import ProfileStatsModal from "./ProfileStatsModal";

export default function ProfileStats({
  className,
  followersCount,
  followingsCount,
  user,
}) {
  const [openModal, setOpenModal] = useState(false);

  const { currentUser } = useAuth();
  const { id } = user || {};

  const isMyProfile = currentUser.id === id;

  return (
    <>
      <div className={`${styles["profile-stats"]} ${className || ""}`}>
        <button
          aria-label="View followers and following"
          className={styles.counts}
          onClick={() => setOpenModal(true)}
        >
          <span>{followersCount} followers</span>
          <span> • </span>
          <span>{followingsCount} followings</span>{" "}
        </button>
        <div className={styles["buttons"]}>
          {!isMyProfile && <FollowMessageButtons user={user} />}

          {isMyProfile && <EditLogoutButtons />}
        </div>
      </div>
      {openModal && <ProfileStatsModal onClose={() => setOpenModal(false)} />}
    </>
  );
}
