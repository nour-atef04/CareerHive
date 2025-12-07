import ProfileSummaryHomePanel from "../components/HomePanels/ProfileSummaryHomePanel";
import JobsPanel from "../components/JobsPanels/JobsPanel";
import SearchJobsPanels from "../components/JobsPanels/SearchJobsPanel";
import styles from "./Jobs.module.css";

export default function Jobs() {
  return (
    <main className={styles["main"]}>
      <div className={styles["left-column"]}>
        <ProfileSummaryHomePanel
          className={styles["profile-summary-section"]}
        />
        <SearchJobsPanels />
      </div>
      <JobsPanel className={styles["jobs-section"]}/>
    </main>
  );
}
