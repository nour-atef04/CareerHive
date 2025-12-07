import styles from "./JobsList.module.css";
import fakeJobs from "./fakeJobs";
import JobItem from "./JobItem";
import { useNavigate } from "react-router-dom";

export default function JobsList({ setShowJob }) {
  const navigate = useNavigate();

  return (
    <div className={styles["list"]}>
      {fakeJobs.map((job) => (
        <JobItem
          job={job}
          key={job.id}
          onClick={() => {
            setShowJob && setShowJob(true);
            navigate(`/jobs/${encodeURIComponent(job.id)}`);
          }}
        />
      ))}
    </div>
  );
}
