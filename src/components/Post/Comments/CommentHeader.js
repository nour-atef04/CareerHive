// import { useSelector } from "react-redux";
import { useAuth } from "../../../context/AuthContext";
import ProfileIcon from "../../ui/ProfileIcon";
import styles from "./CommentHeader.module.css";
// import { getUser } from "../../../redux/slices/authSlice";

export default function CommentHeader() {
  // const user = useSelector(getUser);
  const { currentUser: user } = useAuth();
  const { name, image, position } = user;
  return (
    <div className={styles["commenter-header"]}>
      <ProfileIcon src={`/assets/${image}.jpg`} alt="user" size="small" />
      <div>
        <p className={styles["name"]}>{name}</p>
        <p>{position}</p>
      </div>
    </div>
  );
}
