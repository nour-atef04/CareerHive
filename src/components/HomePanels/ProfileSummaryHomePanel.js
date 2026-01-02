import styles from "./ProfileSummaryHomePanel.module.css";
import { useNavigate } from "react-router-dom";
import ProfileIconHeader from "../ui/ProfileIconHeader";
import ProfileNamePosition from "../ui/ProfileNamePosition";
import Panel from "../ui/Panel";
import { useAuth } from "../../context/AuthContext";
import Loader from "../ui/Loader";
import { useUserFollowers, useUserFollowings } from "../../hooks/useUsers";

export default function ProfileSummaryHomePanel({ className }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { name, image, position } = currentUser;

  const userId = currentUser?.id;

  const { data: followingIds = [], isLoading: isLoadingFollowings } =
    useUserFollowings(userId);

  const { data: followerIds = [], isLoading: isLoadingFollowers } =
    useUserFollowers(userId);

  return (
    <Panel
      className={`${styles["profile-summary-container"]} ${className || ""}`}
    >
      <ProfileIconHeader
        type="centered"
        src={`/assets/${image}.jpg`}
        alt={`${name}'s profile`}
      />
      <ProfileNamePosition
        className={styles["name-position"]}
        name={name}
        position={position}
      />
      <div className={styles["stats"]}>
        <p>Followers</p>
        {!isLoadingFollowers ? <p>{followerIds.length}</p> : <Loader />}
      </div>
      <div className={styles["stats"]}>
        <p>Following</p>
        {!isLoadingFollowings ? <p>{followingIds.length}</p> : <Loader />}
      </div>
      <p onClick={() => navigate("/profile")}>View Profile</p>
    </Panel>
  );
}
