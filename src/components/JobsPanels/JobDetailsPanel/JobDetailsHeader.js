import PanelTitle from "../../ui/PanelTitle";
import styles from "./JobDetailsHeader.module.css";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import { useJobDetails } from "../../../hooks/useJobDetails";
import { BiLinkExternal } from "react-icons/bi";

export default function JobDetailsHeader({ setShowJob }) {
  const { job, isLoading, error } = useJobDetails();

  if (isLoading) return <Loader />;
  if (error || !job) return <p>Job not found</p>;

  const { title, owner, type, createdAt, url } = job;

  // compute relative date
  const timeAgo = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diffHours = Math.floor(
    (Date.now() - new Date(createdAt)) / (1000 * 60 * 60)
  );
  const relative =
    diffHours < 24
      ? timeAgo.format(-diffHours, "hour")
      : timeAgo.format(-Math.floor(diffHours / 24), "day");

  function handleExternalLink() {
    window.open(url, "_blank");
  }

  return (
    <>
      <button
        className={styles["back-button"]}
        onClick={() => setShowJob(false)}
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
          <BiLinkExternal />
        </Button>
        <Button variant="outline-dark">Save</Button>
      </div>
    </>
  );
}
