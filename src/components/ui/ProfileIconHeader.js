import { useNavigate } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import styles from "./ProfileIconHeader.module.css";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/slices/authSlice";

export default function ProfileIconHeader({ type }) {
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const { image } = user;

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
        src={`/assets/${image}.jpg`}
        alt="user profile"
        size="large"
        onClick={() => navigate("/profile")}
      />
    </div>
  );
}
