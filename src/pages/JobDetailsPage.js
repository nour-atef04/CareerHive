import { useParams } from "react-router-dom";
import fakeJobs from "../components/JobsPanels/fakeJobs";
import styles from "./JobDetailsPage.module.css";
import { useState } from "react";
import JobsListPanel from "../components/JobsPanels/JobsListPanel";
import JobDetailsPanel from "../components/JobsPanels/JobDetailsPanel/JobDetailsPanel";
import Panel from "../components/ui/Panel";

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const job = fakeJobs.find((j) => j.id === Number(jobId));

  const [showJob, setShowJob] = useState(false);

  if (!job) return <p>Job not found</p>;

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
