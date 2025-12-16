import styles from "./JobsListPanel.module.css";
import JobSearchInput from "./JobSearchInput";
import JobsList from "./JobsList";
import { useState } from "react";

export default function JobsListPanel({
  variant = "main", // "main" | "details"
  showJob,
  setShowJob,
  className,
}) {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  return (
    <section
      className={`
        ${styles.container} 
        ${styles[variant]} 
        ${showJob && styles.hidden} 
        ${className}`}
    >
      <JobSearchInput
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          setPage(1);
        }}
        className={styles["search-job-input"]}
      />
      <JobsList
        page={page}
        setPage={setPage}
        keyword={keyword}
        setShowJob={setShowJob}
      />
    </section>
  );
}
