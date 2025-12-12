import styles from "./JobsList.module.css";
// import fakeJobs from "./fakeJobs";
import JobItem from "./JobItem";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";

export default function JobsList({ setShowJob }) {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useJobs({});

  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const jobs = data?.result?.jobs || [];

  if (jobs.length === 0) return <p>No jobs found.</p>;

  return (
    <div className={styles["list"]}>
      {jobs.map((job) => (
        <JobItem
          job={job}
          key={job._id}
          onClick={() => {
            setShowJob && setShowJob(true);
            navigate(`/jobs/${encodeURIComponent(job.id)}`);
          }}
        />
      ))}
    </div>
  );
}
