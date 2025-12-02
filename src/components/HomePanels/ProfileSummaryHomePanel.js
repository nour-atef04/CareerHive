import { useSelector } from "react-redux";
import styles from "./ProfileSummaryHomePanel.module.css";
import { getFollowers, getFollowings } from "../../redux/slices/followSlice";
import { getUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import ProfileIconHeader from "../ui/ProfileIconHeader";
import ProfileNamePosition from "../ui/ProfileNamePosition";

export default function ProfileSummaryHomePanel({ className }) {
  const user = useSelector(getUser);
  const { name, position } = user;
  const followers = useSelector(getFollowers);
  const followings = useSelector(getFollowings);

  const navigate = useNavigate();

  return (
    <div
      className={`${styles["profile-summary-container"]} ${className || ""}`}
    >
      <ProfileIconHeader type="centered"/>
      <ProfileNamePosition name={name} position={position} />
      <div className={styles["stats"]}>
        <p>Followers</p>
        <p>{followers.length}</p>
      </div>
      <div className={styles["stats"]}>
        <p>Following</p>
        <p>{followings.length}</p>
      </div>
      <p onClick={()=>navigate("/profile")}>View Profile</p>
    </div>
  );
}
