import JobItem from "./JobItem";
import styles from "./JobsList.module.css";
import fakeJobs from "./fakeJobs";

export default function JobsList() {
  return (
    <div className={styles["jobs-list"]}>
      {fakeJobs.map((job) => (
        <JobItem job={job} />
      ))}
    </div>
  );
}
