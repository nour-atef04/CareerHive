import styles from "./ProfileSummaryHomePanel.module.css";
import { Link, useNavigate } from "react-router-dom";
import ProfileIconHeader from "../ui/ProfileIconHeader";
import ProfileNamePosition from "../ui/ProfileNamePosition";
import Panel from "../ui/Panel";
import { useAuth } from "../../context/AuthContext";
import Loader from "../ui/Loader";
import { useUserFollowers, useUserFollowings } from "../../hooks/useUsers";

export default function ProfileSummaryHomePanel({ className }) {
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const { id, name, image, position } = currentUser || {};

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
        src={image}
        alt={`${name}'s profile`}
        onClick={() => navigate(`/profile/${id}`)}
      />
      <ProfileNamePosition
        className={styles["name-position"]}
        name={name}
        position={position}
      />
      <div className={styles["stats"]}>
        {!isLoadingFollowers ? (
          <>
            <p>Followers</p> <p>{followerIds.length}</p>
          </>
        ) : (
          <Loader />
        )}
      </div>
      <div className={styles["stats"]}>
        {!isLoadingFollowings ? (
          <>
            <p>Following</p> <p>{followingIds.length}</p>
          </>
        ) : (
          <Loader />
        )}
      </div>
      <Link to={`/profile/${userId}`} className={styles["view-profile-link"]}>
        View Profile
      </Link>
    </Panel>
  );
}
