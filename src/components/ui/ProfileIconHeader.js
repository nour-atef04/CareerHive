import { useNavigate } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import styles from "./ProfileIconHeader.module.css";

export default function ProfileIconHeader({ type, src, alt, onClick }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/profile");
  }

  const className = {
    centered: "centered",
    left: "left",
  };

  return (
    <div
      className={`${styles["profile-summary-header"]} ${
        styles[className[type]]
      }`}
      onClick={onClick || handleClick}
    >
      <ProfileIcon
        src={src}
        alt={alt}
        size="large"
      />
    </div>
  );
}
