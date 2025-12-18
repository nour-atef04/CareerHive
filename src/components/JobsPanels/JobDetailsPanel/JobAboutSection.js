import { useJobDetails } from "../../../hooks/useJobs";
import Loader from "../../ui/Loader";
import PanelTitle from "../../ui/PanelTitle";
import styles from "./JobAboutSection.module.css";

export default function JobAboutSection() {
  const { job, isLoading, error } = useJobDetails();

  if (isLoading) return <Loader />;
  if (error || !job) return <p>Job not found</p>;

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
    skillRequirements,
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
    <section>
      <PanelTitle className={styles["panel-title"]} type="h3">
        About the job
      </PanelTitle>

      <div className={styles["about"]}>
        {oneSentenceJobSummary ? (
          <p>{oneSentenceJobSummary}</p>
        ) : (
          <p>No job description available.</p>
        )}

        <div className={styles["more-info"]}>
          <p>
            <span>Department: </span>
            {department ?? "No department info available"}
          </p>

          <p>
            <span>Salary (yearly): </span>
            {salaryText}
          </p>

          <p>
            <span>Employment type: </span>
            {employmentType ?? "No employment type info available"}
          </p>

          <p>
            <span>Location: </span>
            {resolvedLocation ?? "No location info available"}
          </p>

          <p>
            <span>Type: </span>
            {type ?? "No job type info available"}
          </p>
        </div>
      </div>

      <PanelTitle className={styles["panel-title"]} type="h3">
        Required Skills
      </PanelTitle>

      <ul className={styles["about"]}>
        {skillRequirements?.length ? (
          skillRequirements.map((skill) => <li key={skill}>{skill}</li>)
        ) : (
          <p>No requirements available.</p>
        )}
      </ul>
    </section>
  );
}
