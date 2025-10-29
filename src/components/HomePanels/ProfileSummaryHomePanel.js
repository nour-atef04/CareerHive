import { useAuth } from "../../context/AuthContext";
import ProfileIcon from "../ProfileIcon";
import styles from "./ProfileSummaryHomePanel.module.css";

export default function ProfileSummaryHomePanel({ className }) {
  const { user } = useAuth();
  const { image, name, position } = user;

  return (
    <div
      className={`${styles["profile-summary-container"]} ${className || ""}`}
    >
      <div className={styles["profile-summary-header"]}>
        <ProfileIcon src={`/assets/${image}.jpg`} alt="user profile" size="large"/>
      </div>
      <p className={styles["profile-name"]}>{name}</p>
      <p className={styles["profile-position"]}>{position}</p>
      <div className={styles["stats"]}>
        <p>Followers</p>
        <p>155</p>
      </div>
      <div className={styles["stats"]}>
        <p>Following</p>
        <p>30</p>
      </div>
      <p>View Profile</p>
    </div>
  );
}
