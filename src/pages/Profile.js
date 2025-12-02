import styles from "./Profile.module.css";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileActivitySection from "../components/Profile/ProfileActivitySection";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/authSlice";

export default function Profile() {
  const { userId } = useParams();

  // "me" -> current logged-in user
  const currentUser = useSelector(getUser);

  // --------- TO DO -------------
  // const otherUser = useSelector((state) => getUserById(state, userId));
  // const user = userId === "me" ? currentUser : otherUser;
  const user = currentUser;

  return (
    <main className={styles["main"]}>
      <ProfileHeader user={user} />
      <ProfileActivitySection user={user}/>
    </main>
  );
}
