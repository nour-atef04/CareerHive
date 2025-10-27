import MostViewedHomePanel from "../components/HomePanels/MostViewedHomePanel";
import Posts from "../components/Post/Posts";
import PremiumHomePanel from "../components/HomePanels/PremiumHomePanel";
import ProfileSummaryHomePanel from "../components/HomePanels/ProfileSummaryHomePanel";
import SuggestionsHomePanel from "../components/HomePanels/SuggestionsHomePanel";
import TopJobsHomePanel from "../components/HomePanels/TopJobsHomePanel";
import styles from "./Home.module.css";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className={styles.main}>
      <section className={styles["left-section"]}>
        <ProfileSummaryHomePanel
          profileName={user.name}
          className={styles["profile-summary-panel"]}
        />
        <SuggestionsHomePanel className={styles["suggestions-panel"]} />
      </section>

      <Posts className={styles["posts-panel"]} />

      <section className={styles["right-section"]}>
        <PremiumHomePanel className={styles["premium-panel"]} />
        <TopJobsHomePanel className={styles["top-jobs-panel"]} />
        <MostViewedHomePanel className={styles["most-viewed-panel"]} />
      </section>
    </main>
  );
}
