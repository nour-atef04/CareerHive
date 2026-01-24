import { FiBookmark } from "react-icons/fi";
import { LuSquarePen } from "react-icons/lu";
import styles from "./JobsActionsPanel.module.css";
import Panel from "../ui/Panel";
import { useState } from "react";
import Modal from "../ui/Modal";
import { useSavedJobs } from "../../hooks/useJobs";
import PanelTitle from "../ui/PanelTitle";
import Loader from "../ui/Loader";
import JobsList from "./JobsList";
// import JobSearchInput from "./JobSearchInput";

export default function JobsActionsPanel() {
  const [openModal, setOpenModal] = useState(false);
  const { data: savedJobs, isLoading } = useSavedJobs();

  return (
    <Panel className={styles["search-job-container"]}>
      {/* <JobSearchInput className={styles["search-job-input"]} /> */}

      <div className={styles["saved-jobs"]} onClick={() => setOpenModal(true)}>
        <FiBookmark />
        My saved jobs
      </div>
      <hr className={styles["line"]} />
      <div className={styles["post-job"]}>
        <LuSquarePen />
        Post a job
      </div>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <PanelTitle>Saved Jobs</PanelTitle>
          <div className={styles.list}>
            {isLoading ? (
              <Loader />
            ) : (
              <JobsList givenJobs={savedJobs.map((job) => job.jobs.raw)} />
            )}
          </div>
        </Modal>
      )}
    </Panel>
  );
}
