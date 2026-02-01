import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUsers";
import ProfileIcon from "../ui/ProfileIcon";
import Loader from "../ui/Loader";
import styles from "./Notification.module.css";

export default function Notification({ notification }) {
  const { type, senderId, postId } = notification;

  const navigate = useNavigate();
  const { data: sender = {}, isLoading: isLoadingSender } = useUser(senderId);

  const { id, image, name } = sender;
  if (isLoadingSender) return <Loader />;

  return (
    <div className={styles.notification}>
      <ProfileIcon src={image} onClick={() => navigate(`/profile/${id}`)} />
      <p>
        <span
          onClick={() => navigate(`/profile/${id}`)}
          className={styles.name}
        >
          {name}
        </span>{" "}
        <span
          onClick={() => navigate(`/post/${postId}`)}
          className={styles.text}
        >
          {type === "like" && "liked your post"}
          {type === "comment" && "commented on your post"}
        </span>
      </p>
    </div>
  );
}
