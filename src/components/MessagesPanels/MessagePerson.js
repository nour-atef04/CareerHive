import { useNavigate } from "react-router-dom";
import ProfileIcon from "../ui/ProfileIcon";
import styles from "./MessagePerson.module.css";

export default function MessagePerson({ onClick, id, image, name, className }) {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles["message-person"]} ${className || ""}`}
      onClick={onClick}
    >
      <ProfileIcon
        src={`/assets/${image}.jpg`}
        alt="user profile"
        onClick={() => navigate(`/profile/${id}`)}
      />
      <p>{name}</p>
    </div>
  );
}
