// import fakeJobs from "../components/JobsPanels/fakeJobs";
import styles from "./JobDetailsPage.module.css";
import { useState } from "react";
import JobsListPanel from "../components/JobsPanels/JobsListPanel";
import JobDetailsPanel from "../components/JobsPanels/JobDetailsPanel/JobDetailsPanel";
import Panel from "../components/ui/Panel";
import { useJobDetails } from "../hooks/useJobs";

export default function JobDetailsPage() {
  const { job, isLoading, error } = useJobDetails();

  const [showJob, setShowJob] = useState(false);

  if (isLoading) {
    return (
      <main className={styles["main"]}>
        <p>Loading job details...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles["main"]}>
        <p>Error loading jobs: {error.message}</p>
      </main>
    );
  }

  if (!job) {
    return (
      <main className={styles["main"]}>
        <p>Job not found</p>
      </main>
    );
  }

  return (
    <main className={styles["main"]}>
      <Panel className={styles["panels"]}>
        <JobsListPanel
          className={styles["jobs-list-panel"]}
          showJob={showJob}
          setShowJob={setShowJob}
          variant="details"
        />
        <JobDetailsPanel showJob={showJob} setShowJob={setShowJob} job={job} />
      </Panel>
    </main>
  );
}
