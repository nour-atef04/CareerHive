import { Link } from "react-router-dom";
import styles from "./JobItem.module.css";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { useState } from "react";

export default function JobItem({ job, onClick }) {
  const {
    _id,
    title,
    owner,
    type,
    locationAddress,
    location,
    descriptionBreakdown,
  } = job;

  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className={styles["item-container"]}>
      <Link to={`/jobs/${_id}`} className={styles["job-item"]}>
        <p className={styles["job-name"]} onClick={onClick}>
          {title}
        </p>

        <div className={styles["job-info"]}>
          {owner.companyName} •{" "}
          {owner.locationAddress || locationAddress || location} ({type}){" "}
          {descriptionBreakdown && `• ${descriptionBreakdown.employmentType}`}
        </div>
      </Link>
      <div className={styles.save} onClick={() => setIsSaved((prev) => !prev)}>
        {!isSaved ? <FaRegBookmark /> : <FaBookmark />}
      </div>
    </div>
  );
}
