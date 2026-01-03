import ProfileIconHeader from "../ui/ProfileIconHeader";
import ProfileNamePosition from "../ui/ProfileNamePosition";
import styles from "./ProfileHeader.module.css";
import ProfileStats from "./ProfileStats";
import ProfileSection from "./ProfileSection";
import { useUserFollowers, useUserFollowings } from "../../hooks/useUsers";
import Loader from "../ui/Loader";

export default function ProfileHeader({ user }) {
  const { name, image, position } = user || {};

  const { data: followers = [], isLoading: isLoadingFollowers } =
    useUserFollowers(user.id);
  const followersCount = followers.length;

  const { data: followings = [], isLoading: isLoadingFollowings } =
    useUserFollowings(user.id);
  const followingsCount = followings.length;

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
      {!isLoadingFollowers && !isLoadingFollowings ? (
        <ProfileStats
          className={styles["stats-container"]}
          followersCount={followersCount}
          followingsCount={followingsCount}
        />
      ) : (
        <Loader className={styles.loader} />
      )}
    </ProfileSection>
  );
}
