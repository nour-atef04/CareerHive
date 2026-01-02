import Posts from "../components/Post/Posts";
import PremiumHomePanel from "../components/HomePanels/PremiumHomePanel";
import ProfileSummaryHomePanel from "../components/HomePanels/ProfileSummaryHomePanel";
import SuggestionsHomePanel from "../components/HomePanels/Suggestions/SuggestionsHomePanel";
import TopJobsHomePanel from "../components/HomePanels/TopJobs/TopJobsHomePanel";
import styles from "./Home.module.css";
import { useAuth } from "../context/AuthContext";
import { useMemo } from "react";
import { useUserFollowings } from "../hooks/useUsers";
import Loader from "../components/ui/Loader";

export default function Home() {
  const { currentUser } = useAuth();
  const userId = currentUser?.id;
  const { data: followingIds = [], isLoading } = useUserFollowings(userId);
  // console.log(userId + followingIds);

  // useMemo since react query won't refetch if the array ref doesn't change locally
  const feedAuthorIds = useMemo(() => {
    return Array.from(new Set([...followingIds, userId]));
  }, [followingIds, userId]);

  return (
    <main className={styles.main}>
      <section className={styles["left-section"]}>
        <ProfileSummaryHomePanel className={styles["profile-summary-panel"]} />
        <SuggestionsHomePanel className={styles["suggestions-panel"]} />
      </section>

      {!isLoading ? (
        <Posts className={styles["posts-panel"]} followingIds={feedAuthorIds} />
      ) : (
        <Loader />
      )}
      <section className={styles["right-section"]}>
        <PremiumHomePanel className={styles["premium-panel"]} />
        <TopJobsHomePanel className={styles["top-jobs-panel"]} />
      </section>
    </main>
  );
}
