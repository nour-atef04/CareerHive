import ProfileSummaryHomePanel from "../components/HomePanels/ProfileSummaryHomePanel";
import SearchJobsPanels from "../components/JobsPanels/SearchJobsPanel";
import styles from "./Jobs.module.css";

export default function Jobs() {
  return (
    <main className={styles["main"]}>
      <div className={styles["left-column"]}>
        <ProfileSummaryHomePanel
          className={styles["profile-summary-section"]}
        />
        <SearchJobsPanels className={styles["search-jobs-section"]}/>
      </div>
      <section className={styles["jobs-section"]}>Jobs</section>
    </main>
  );
}
