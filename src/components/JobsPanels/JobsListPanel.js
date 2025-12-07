import styles from "./JobsListPanel.module.css";
import JobSearchInput from "./JobSearchInput";
import JobsList from "./JobsList";

export default function JobsListPanel({
  variant = "main", // "main" | "details"
  showJob,
  setShowJob,
  className,
}) {
  return (
    <section
      className={`
        ${styles.container} 
        ${styles[variant]} 
        ${showJob && styles.hidden} 
        ${className}`}
    >
      <JobSearchInput className={styles["search-job-input"]} />
      <JobsList setShowJob={setShowJob} />
    </section>
  );
}
