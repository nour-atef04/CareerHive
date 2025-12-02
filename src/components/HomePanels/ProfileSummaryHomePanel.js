import { useSelector } from "react-redux";
import ProfileIcon from "../ProfileIcon";
import styles from "./ProfileSummaryHomePanel.module.css";
import { getFollowers, getFollowings } from "../../redux/slices/followSlice";
import { getUser } from "../../redux/slices/authSlice";

export default function ProfileSummaryHomePanel({ className }) {

  const user = useSelector(getUser);
  const { image, name, position } = user;
  const followers = useSelector(getFollowers);
  const followings = useSelector(getFollowings);

  return (
    <div
      className={`${styles["profile-summary-container"]} ${className || ""}`}
    >
      <div className={styles["profile-summary-header"]}>
        <ProfileIcon
          src={`/assets/${image}.jpg`}
          alt="user profile"
          size="large"
        />
      </div>
      <p className={styles["profile-name"]}>{name}</p>
      <p className={styles["profile-position"]}>{position}</p>
      <div className={styles["stats"]}>
        <p>Followers</p>
        <p>{followers.length}</p>
      </div>
      <div className={styles["stats"]}>
        <p>Following</p>
        <p>{followings.length}</p>
      </div>
      <p>View Profile</p>
    </div>
  );
}
