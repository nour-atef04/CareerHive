import styles from "./JobDetailsPanel.module.css";
import JobDetailsHeader from "./JobDetailsHeader";
import JobAboutSection from "./JobAboutSection";

export default function JobDetailsPanel({ showJob, setShowJob, job }) {
  return (
    <section
      className={`${styles["job-details-section"]} ${
        showJob && styles["show-job"]
      }`}
    >
      <JobDetailsHeader setShowJob={setShowJob} job={job} />
      <JobAboutSection />
    </section>
  );
}
