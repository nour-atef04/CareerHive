import { useNavigate } from "react-router-dom";
import styles from "./PersonLi.module.css";
import ProfileIcon from "./ProfileIcon";

export default function PersonLi({
  className,
  person,
  children = "",
  onClick,
}) {
  console.log(person);

  const { id, name, image, position } = person;
  const navigate = useNavigate();

  const handleRowClick = () => {
    if (onClick) onClick();
    else navigate(`/profile/${id}`);
  };

  return (
    <div
      className={`${className || ""} ${styles["person"]}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleRowClick();
      }}
    >
      <ProfileIcon
        src={image}
        alt={`${name}'s profile`}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/profile/${id}`);
        }}
      />
      <div className={styles["info"]}>
        <p className={styles["name"]}>{name}</p>
        <p className={styles["position"]}>{position}</p>
      </div>
      {children}
    </div>
  );
}
