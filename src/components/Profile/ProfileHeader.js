// import { useSelector } from "react-redux";
import ProfileIconHeader from "../ui/ProfileIconHeader";
import ProfileNamePosition from "../ui/ProfileNamePosition";
import styles from "./ProfileHeader.module.css";
import ProfileStats from "./ProfileStats";
// import { getFollowers, getFollowings } from "../../redux/slices/followSlice";
import ProfileSection from "./ProfileSection";

export default function ProfileHeader({ user }) {
  // const { name, position } = user;
  // const followersCount = useSelector(getFollowers).length;
  // const followingsCount = useSelector(getFollowings).length;
  const { name, position, followers = [], followings = [] } = user || {};
  const followersCount = followers.length;
  const followingsCount = followings.length;
  return (
    <ProfileSection>
      <ProfileIconHeader type={"left"} />
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
