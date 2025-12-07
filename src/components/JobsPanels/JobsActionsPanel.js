import { FiBookmark } from "react-icons/fi";
import { LuSquarePen } from "react-icons/lu";
import styles from "./JobsActionsPanel.module.css";
import Panel from "../ui/Panel";
// import JobSearchInput from "./JobSearchInput";

export default function JobsActionsPanel() {
  return (
    <Panel className={styles["search-job-container"]}>
      {/* <JobSearchInput className={styles["search-job-input"]} /> */}

      <div className={styles["saved-jobs"]}>
        <FiBookmark />
        My saved jobs
      </div>
      <hr className={styles["line"]} />
      <div className={styles["post-job"]}>
        <LuSquarePen />
        Post a job
      </div>
    </Panel>
  );
}
