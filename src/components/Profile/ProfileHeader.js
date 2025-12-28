import ProfileIconHeader from "../ui/ProfileIconHeader";
import ProfileNamePosition from "../ui/ProfileNamePosition";
import styles from "./ProfileHeader.module.css";
import ProfileStats from "./ProfileStats";
import ProfileSection from "./ProfileSection";

export default function ProfileHeader({ user }) {
  const {
    name,
    image,
    position,
    followerIds = [],
    followingIds = [],
  } = user || {};
  const followersCount = followerIds.length;
  const followingsCount = followingIds.length;

  return (
    <ProfileSection>
      <ProfileIconHeader
        src={`/assets/${image}.jpg`}
        alt={`${name}'s profile`}
        type={"left"}
      />
      <ProfileNamePosition
        className={styles["profile-name"]}
        name={name}
        position={position}
      />
      <ProfileStats
        className={styles["stats-container"]}
        followersCount={followersCount}
        followingsCount={followingsCount}
      />
    </ProfileSection>
  );
}
