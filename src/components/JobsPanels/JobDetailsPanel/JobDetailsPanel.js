import styles from "./JobDetailsPanel.module.css";
import JobDetailsHeader from "./JobDetailsHeader";
import JobAboutSection from "./JobAboutSection";

export default function JobDetailsPanel({ showJob, setShowJob }) {

  return (
    <section
      className={`${styles["job-details-section"]} ${
        showJob && styles["show-job"]
      }`}
    >
      <JobDetailsHeader setShowJob={setShowJob} />
      <JobAboutSection />
    </section>
  );
}
