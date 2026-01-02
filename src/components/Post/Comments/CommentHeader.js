// import { useSelector } from "react-redux";
import { useUser } from "../../../hooks/useUsers";
import ProfileIcon from "../../ui/ProfileIcon";
import styles from "./CommentHeader.module.css";
// import { getUser } from "../../../redux/slices/authSlice";

export default function CommentHeader({ comment }) {
  const authorId = comment?.authorId;
  const { data: user = {} } = useUser(authorId);

  return (
    <div className={styles["commenter-header"]}>
      <ProfileIcon src={`/assets/${user.image}.jpg`} alt="user" size="small" />
      <div>
        <p className={styles["name"]}>{user.name}</p>
        <p>{user.position}</p>
      </div>
    </div>
  );
}
