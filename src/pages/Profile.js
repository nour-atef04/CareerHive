import styles from "./Profile.module.css";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileActivitySection from "../components/Profile/ProfileActivitySection";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUsers";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/ui/Loader";

export default function Profile() {
  const { userId } = useParams();

  const { data: otherUser, isLoading: isLoadingUser } = useUser(userId);
  const { currentUser } = useAuth();

  const user = userId === "me" ? currentUser : otherUser;

  if (isLoadingUser) return <Loader />;

  return (
    <main className={styles["main"]}>
      <ProfileHeader user={user} />
      <ProfileActivitySection user={user} />
    </main>
  );
}
