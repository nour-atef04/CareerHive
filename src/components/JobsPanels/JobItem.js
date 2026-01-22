import { Link } from "react-router-dom";
import styles from "./JobItem.module.css";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { useSavedJobs, useSaveJob, useUnsaveJob } from "../../hooks/useJobs";

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

  const { mutate: saveJob, isLoading: isSaving } = useSaveJob();
  const { mutate: unsaveJob, isLoading: isUnsaving } = useUnsaveJob();

  const { data: savedJobs = [] } = useSavedJobs();

  const isSaved = savedJobs.some((item) => item.jobs.external_job_id === _id);

  function handleToggleSave(e) {
    e.preventDefault();
    e.stopPropagation();

    if (isSaving || isUnsaving) return;

    if (isSaved) {
      unsaveJob(job);
    } else {
      saveJob(job);
    }
  }

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
      <div
        className={styles.save}
        onClick={handleToggleSave}
        style={{ cursor: isSaving || isUnsaving ? "not-allowed" : "pointer" }}
      >
        {!isSaved ? <FaRegBookmark /> : <FaBookmark />}
      </div>
    </div>
  );
}
