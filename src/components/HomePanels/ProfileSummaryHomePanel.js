import styles from "./ProfileSummaryHomePanel.module.css";
import { useNavigate } from "react-router-dom";
import ProfileIconHeader from "../ui/ProfileIconHeader";
import ProfileNamePosition from "../ui/ProfileNamePosition";
import Panel from "../ui/Panel";
import { useAuth } from "../../context/AuthContext";

export default function ProfileSummaryHomePanel({ className }) {
  const navigate = useNavigate();
  const { currentUser: user } = useAuth();
  if (!user) return null;
  const { name, image, position, followerIds, followingIds } = user || {};

  return (
    <Panel
      className={`${styles["profile-summary-container"]} ${className || ""}`}
    >
      <ProfileIconHeader userImage={image} type="centered" />
      <ProfileNamePosition
        className={styles["name-position"]}
        name={name}
        position={position}
      />
      <div className={styles["stats"]}>
        <p>Followers</p>
        <p>{followerIds.length}</p>
      </div>
      <div className={styles["stats"]}>
        <p>Following</p>
        <p>{followingIds.length}</p>
      </div>
      <p onClick={() => navigate("/profile")}>View Profile</p>
    </Panel>
  );
}
