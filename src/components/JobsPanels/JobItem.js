import { Link } from "react-router-dom";
import styles from "./JobItem.module.css";

export default function JobItem({ job }) {
  const { id, jobName, company, location, isRemote, salary } = job;

  return (
    <Link to={`/jobs/${id}`} className={styles["job-item"]}>
      <p className={styles["job-name"]}>{jobName}</p>

      <div className={styles["job-info"]}>
        {company} • {location} {isRemote ? "(Remote)" : "(On-site)"}{" "}
        {salary && `• ${salary}`}
      </div>
    </Link>
  );
}
