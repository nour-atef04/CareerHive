import ProfileIcon from "../ui/ProfileIcon";
import styles from "./MessagePerson.module.css";

export default function MessagePerson({ onClick, name, className }) {
  return (
    <div
      className={`${styles["message-person"]} ${className || ""}`}
      onClick={onClick}
    >
      <ProfileIcon />
      <p>{name}</p>
    </div>
  );
}
