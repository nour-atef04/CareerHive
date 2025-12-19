import styles from "./Profile.module.css";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileActivitySection from "../components/Profile/ProfileActivitySection";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUsers";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { userId } = useParams();

  // "me" -> current logged-in user
  const { data: otherUser } = useUser(userId);
  const { currentUser } = useAuth();

  const user = userId === "me" ? currentUser : otherUser;

  return (
    <main className={styles["main"]}>
      <ProfileHeader user={user} />
      <ProfileActivitySection user={user} />
    </main>
  );
}
