import { Link } from "react-router-dom";
import styles from "./JobItem.module.css";

export default function JobItem({ job, onClick }) {
  const { _id, title, owner, locationAddress, type } = job;

  return (
    <Link to={`/jobs/${_id}`} className={styles["job-item"]}>
      <p className={styles["job-name"]} onClick={onClick}>
        {title}
      </p>

      <div className={styles["job-info"]}>
        {owner.companyName} • {locationAddress} ({type}){" "}
      </div>
    </Link>
  );
}
