import PanelTitle from "../../ui/PanelTitle";
import styles from "./JobDetailsHeader.module.css";
import Button from "../../ui/Button";

export default function JobDetailsHeader({ job, setShowJob }) {
  const { jobName, company, location, isRemote, salary } = job;

  return (
    <>
      <button
        className={styles["back-button"]}
        onClick={() => setShowJob(false)}
      >
        ←
      </button>
      <p className={styles["company-name"]}>{company}</p>
      <PanelTitle type="h2">{jobName}</PanelTitle>
      <div className={styles["job-info"]}>
        {location} {isRemote ? "(Remote)" : "(On-site)"}{" "}
        {salary && `• ${salary}`}
      </div>
      <div className={styles["buttons"]}>
        <Button>Apply</Button>
        <Button variant="outline-dark">Save</Button>
      </div>
    </>
  );
}
