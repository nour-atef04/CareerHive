import Posts from "../components/Post/Posts";
import PremiumHomePanel from "../components/HomePanels/PremiumHomePanel";
import ProfileSummaryHomePanel from "../components/HomePanels/ProfileSummaryHomePanel";
import SuggestionsHomePanel from "../components/HomePanels/Suggestions/SuggestionsHomePanel";
import TopJobsHomePanel from "../components/HomePanels/TopJobs/TopJobsHomePanel";
import styles from "./Home.module.css";
import { useAuth } from "../context/AuthContext";
import { useMemo } from "react";

export default function Home() {
  const { currentUser } = useAuth();

  // useMemo since react query won't refetch if the array ref doesn't change locally
  const feedAuthorIds = useMemo(() => {
    return Array.from(new Set([...currentUser.followingIds, currentUser.id]));
  }, [currentUser.followingIds, currentUser.id]);

  return (
    <main className={styles.main}>
      <section className={styles["left-section"]}>
        <ProfileSummaryHomePanel className={styles["profile-summary-panel"]} />
        <SuggestionsHomePanel className={styles["suggestions-panel"]} />
      </section>

      <Posts className={styles["posts-panel"]} followingIds={feedAuthorIds} />

      <section className={styles["right-section"]}>
        <PremiumHomePanel className={styles["premium-panel"]} />
        <TopJobsHomePanel className={styles["top-jobs-panel"]} />
      </section>
    </main>
  );
}
