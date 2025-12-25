import { useNavigate } from "react-router-dom";
import styles from "./PersonLi.module.css";
import ProfileIcon from "./ProfileIcon";

export default function PersonLi({
  className,
  person,
  children = "",
  onClick,
}) {
  const { id, name, image, position } = person;
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/profile/${id}`);
  }

  return (
    <div className={`${className || ""} ${styles["person"]}`}>
      <ProfileIcon
        src={`/assets/${image}.jpg`}
        alt="user profile"
        onClick={onClick || handleClick}
      />
      <div className={styles["info"]}>
        <p className={styles["name"]}>{name}</p>
        <p className={styles["position"]}>{position}</p>
      </div>
      {children}
    </div>
  );
}
