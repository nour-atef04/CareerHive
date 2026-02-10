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
  const isLoading = isSaving || isUnsaving;

  const { data: savedJobs = [] } = useSavedJobs();

  const isSaved = savedJobs.some((item) => item.jobs.external_job_id === _id);

  function handleToggleSave(e) {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    if (isSaved) {
      unsaveJob(job);
    } else {
      saveJob(job);
    }
  }

  return (
    <article className={styles["item-container"]}>
      <Link to={`/jobs/${_id}`} className={styles["job-item"]}>
        <h4 className={styles["job-name"]}>{title}</h4>

        <div className={styles["job-info"]}>
          <span>{owner.companyName}</span> <span>•</span>{" "}
          <span>{owner.locationAddress || locationAddress || location}</span>
          <span>({type})</span>
          {descriptionBreakdown?.employmentType && (
            <>
              {" "}
              <span>•</span> <span>{descriptionBreakdown.employmentType}</span>
            </>
          )}
        </div>
      </Link>
      <button
        type="button"
        className={styles.save}
        onClick={handleToggleSave}
        disabled={isLoading}
        aria-label={isSaved ? "Unsave job" : "Save job"}
        title={isSaved ? "Unsave job" : "Save job"}
      >
        {isSaved ? <FaBookmark /> : <FaRegBookmark />}
      </button>
    </article>
  );
}
