import { useState } from "react";
import styles from "./ProfileStats.module.css";
import ProfileStatsModal from "./ProfileStatsModal";

export default function ProfileStats({
  className,
  followersCount,
  followingsCount,
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div
        className={`${styles["profile-stats"]} ${className || ""}`}
        onClick={() => setOpenModal(true)}
      >
        <span>{followersCount} followers</span>
        <span> • </span>
        <span>{followingsCount} followings</span>
      </div>
      {openModal && <ProfileStatsModal onClose={() => setOpenModal(false)} />}
    </>
  );
}
