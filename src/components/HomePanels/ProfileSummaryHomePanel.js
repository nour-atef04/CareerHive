// import { useSelector } from "react-redux";
import styles from "./ProfileSummaryHomePanel.module.css";
// import { getFollowers, getFollowings } from "../../redux/slices/followSlice";
// import { getUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import ProfileIconHeader from "../ui/ProfileIconHeader";
import ProfileNamePosition from "../ui/ProfileNamePosition";
import Panel from "../ui/Panel";
import { useAuth } from "../../context/AuthContext";

export default function ProfileSummaryHomePanel({ className }) {
  // const user = useSelector(getUser);
  const navigate = useNavigate();
  const { currentUser: user } = useAuth();
  if (!user) return null;
  const { name, position, followerIds, followingIds } = user || {};
  // const followers = useSelector(getFollowers);
  // const followings = useSelector(getFollowings);

  return (
    <Panel
      className={`${styles["profile-summary-container"]} ${className || ""}`}
    >
      <ProfileIconHeader type="centered" />
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
