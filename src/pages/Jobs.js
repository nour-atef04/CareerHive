import ProfileSummaryHomePanel from "../components/HomePanels/ProfileSummaryHomePanel";
import JobsActionsPanel from "../components/JobsPanels/JobsActionsPanel";
import JobsPanel from "../components/JobsPanels/JobsPanel";
import styles from "./Jobs.module.css";

export default function Jobs() {
  return (
    <main className={styles["main"]}>
      <div className={styles["left-column"]}>
        <ProfileSummaryHomePanel
          className={styles["profile-summary-section"]}
        />
        <JobsActionsPanel />
      </div>
      <JobsPanel className={styles["jobs-section"]} variant="main" />
    </main>
  );
}
