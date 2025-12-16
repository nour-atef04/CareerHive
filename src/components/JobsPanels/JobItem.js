import { Link } from "react-router-dom";
import styles from "./JobItem.module.css";

export default function JobItem({ job, onClick }) {
  const { _id, title, owner, type, locationAddress, location, descriptionBreakdown } =
    job;

  return (
    <Link to={`/jobs/${_id}`} className={styles["job-item"]}>
      <p className={styles["job-name"]} onClick={onClick}>
        {title}
      </p>

      <div className={styles["job-info"]}>
        {owner.companyName} •{" "}
        {owner.locationAddress || locationAddress || location} ({type}) {" "}
        {descriptionBreakdown && `• ${descriptionBreakdown.employmentType}`}
      </div>
    </Link>
  );
}
