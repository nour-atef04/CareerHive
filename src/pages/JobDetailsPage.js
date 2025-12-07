import { useParams } from "react-router-dom";
import fakeJobs from "../components/JobsPanels/fakeJobs";
import styles from "./JobDetailsPage.module.css";
import { useState } from "react";
import JobsList from "../components/JobsPanels/JobsList";
import JobDetails from "../components/JobsPanels/JobDetails";
import Panel from "../components/ui/Panel";

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const job = fakeJobs.find((j) => j.id === Number(jobId));

  const [showJob, setShowJob] = useState(false);
  const [jobDetails, setJobDetails] = useState(job);

  if (!job) return <p>Job not found</p>;

  return (
    <main className={styles["main"]}>
      <Panel className={styles["panels"]}>
        <JobsList
          showJob={showJob}
          setShowJob={setShowJob}
          onSetShowJob={setShowJob}
        />
        <JobDetails />
      </Panel>
    </main>
  );
}
