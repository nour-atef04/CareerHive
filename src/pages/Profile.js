import styles from "./Profile.module.css";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileActivitySection from "../components/Profile/ProfileActivitySection";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUsers";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/ui/Loader";

export default function Profile() {
  const { userId } = useParams();
  const { currentUser } = useAuth();

  // if the URL param is "me", swap it for the real id from auth
  const profileId = userId === "me" ? currentUser?.id : userId;

  const { data: user, isLoading } = useUser(profileId);

  if (isLoading) return <Loader />;

  return (
    <main className={styles["main"]}>
      <ProfileHeader user={user} />
      <ProfileActivitySection user={user} />
    </main>
  );
}
