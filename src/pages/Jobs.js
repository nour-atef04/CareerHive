import ProfileSummaryHomePanel from "../components/HomePanels/ProfileSummaryHomePanel";
import JobsActionsPanel from "../components/JobsPanels/JobsActionsPanel";
import JobsPanel from "../components/JobsPanels/JobsPanel";
import styles from "./Jobs.module.css";

export default function Jobs() {
  return (
    <main className={styles["main"]}>
      <aside className={styles["left-column"]}>
        <ProfileSummaryHomePanel
          className={styles["profile-summary-section"]}
        />
        <JobsActionsPanel />
      </aside>
      <section className={styles["jobs-section"]} aria-label="Job Recommendations">
        <JobsPanel variant="main" />
      </section>
    </main>
  );
}
