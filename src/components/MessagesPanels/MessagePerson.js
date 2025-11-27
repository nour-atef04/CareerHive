import ProfileIcon from "../ProfileIcon";
import styles from "./MessagePerson.module.css";

export default function MessagePerson({onClick}) {
  return (
    <div className={styles["message-person"]} onClick={onClick}>
      <ProfileIcon />
      <p>Name</p>
    </div>
  );
}
