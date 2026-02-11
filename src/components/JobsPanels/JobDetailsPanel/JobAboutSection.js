import PanelTitle from "../../ui/PanelTitle";
import styles from "./JobAboutSection.module.css";

export default function JobAboutSection({ job }) {
  if (!job) return <p className={styles.error}>Job details not available.</p>;

  const {
    department,
    type,
    location,
    locationAddress,
    owner,
    descriptionBreakdown = {},
  } = job;

  const {
    oneSentenceJobSummary,
    skillRequirements = [],
    salaryRangeMinYearly,
    salaryRangeMaxYearly,
    employmentType,
  } = descriptionBreakdown;

  const resolvedLocation =
    owner?.locationAddress || locationAddress || location;

  const salaryText =
    salaryRangeMinYearly && salaryRangeMaxYearly
      ? `$${salaryRangeMinYearly} - $${salaryRangeMaxYearly}`
      : "No salary info available";

  return (
    <section className={styles.container}>
      <PanelTitle className={styles["panel-title"]} type="h3">
        About the job
      </PanelTitle>

      <div className={styles["summary"]}>
        <p>{oneSentenceJobSummary || "No job description available."}</p>
      </div>

      <dl className={styles["job-meta"]}>
        <div className={styles["meta-item"]}>
          <dt>Department:</dt>
          <dd>{department || "N/A"}</dd>
        </div>

        <div className={styles["meta-item"]}>
          <dt>Salary (yearly):</dt>
          <dd>{salaryText}</dd>
        </div>

        <div className={styles["meta-item"]}>
          <dt>Employment type:</dt>
          <dd>{employmentType || "N/A"}</dd>
        </div>

        <div className={styles["meta-item"]}>
          <dt>Location:</dt>
          <dd>{resolvedLocation || "N/A"}</dd>
        </div>

        <div className={styles["meta-item"]}>
          <dt>Type:</dt>
          <dd>{type || "N/A"}</dd>
        </div>
      </dl>

      <PanelTitle className={styles["panel-title"]} type="h3">
        Required Skills
      </PanelTitle>

      {skillRequirements.length > 0 ? (
        <ul className={styles["skills-list"]}>
          {skillRequirements.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No specific skills listed.</p>
      )}
    </section>
  );
}
