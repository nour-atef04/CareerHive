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
      <button
        className={styles["action-btn"]}
        onClick={() => setOpenModal(true)}
      >
        <FiBookmark aria-hidden="true" />
        <span>My saved jobs</span>
      </button>
      {/* <hr className={styles["line"]} /> */}
      <button className={styles["action-btn"]}>
        <LuSquarePen aria-hidden="true" />
        <span>Post a job</span>
      </button>
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
