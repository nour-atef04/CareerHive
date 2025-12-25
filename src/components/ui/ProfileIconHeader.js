import { useNavigate } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import styles from "./ProfileIconHeader.module.css";

export default function ProfileIconHeader({ type, userImage }) {
  const navigate = useNavigate();

  const className = {
    centered: "centered",
    left: "left",
  };

  return (
    <div
      className={`${styles["profile-summary-header"]} ${
        styles[className[type]]
      }`}
      onClick={() => navigate("/profile")}
    >
      <ProfileIcon
        src={`/assets/${userImage}.jpg`}
        alt="user profile"
        size="large"
        onClick={() => navigate("/profile")}
      />
    </div>
  );
}
