import { BiLinkExternal } from "react-icons/bi";
import Button from "../../ui/Button";
import PanelTitle from "../../ui/PanelTitle";
import styles from "./JobDetailsHeader.module.css";

export default function JobDetailsHeader({ setShowJob, job }) {
  if (!job) return null;
  const { title, owner, type, createdAt, url } = job;

  // compute relative date
  const timeAgo = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diffHours = Math.floor(
    (Date.now() - new Date(createdAt)) / (1000 * 60 * 60),
  );
  const relative =
    diffHours < 24
      ? timeAgo.format(-diffHours, "hour")
      : timeAgo.format(-Math.floor(diffHours / 24), "day");

  function handleExternalLink() {
    window.open(url, "_blank");
  }

  return (
    <header>
      <button
        className={styles["back-button"]}
        onClick={() => setShowJob(false)}
        aria-label="Back to jobs list"
      >
        ←
      </button>
      <p className={styles["company-name"]}>{owner.companyName}</p>
      <PanelTitle type="h2">{title}</PanelTitle>
      <div className={styles["job-info"]}>
        {owner.locationAddress} ({type}){" "}
        {createdAt &&
          `• ${relative.charAt(0).toUpperCase() + relative.slice(1)}`}
      </div>
      <div className={styles["buttons"]}>
        <Button className={styles["apply-btn"]} onClick={handleExternalLink}>
          Apply
          <BiLinkExternal aria-hidden="true" />
        </Button>
        <Button variant="outline-dark">Save</Button>
      </div>
    </header>
  );
}
