import FormInput from "../ui/FormInput";
import { IoSearchOutline } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";
import { LuSquarePen } from "react-icons/lu";
import styles from "./SearchJobsPanel.module.css";
import Panel from "../ui/Panel";

export default function SearchJobsPanels() {
  return (
    <Panel className={styles["search-job-container"]}>
      <div className={styles["search-job-input"]}>
        <IoSearchOutline />
        <FormInput placeholder="Companies, location, or skills..." />
      </div>

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
