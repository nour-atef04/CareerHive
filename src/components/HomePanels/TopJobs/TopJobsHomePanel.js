import { useJobs } from "../../../hooks/useJobs";
import JobItem from "../../JobsPanels/JobItem";
import List from "../../ui/List";
import Loader from "../../ui/Loader";
import Panel from "../../ui/Panel";
import PanelTitle from "../../ui/PanelTitle";
import styles from "./TopJobsHomePanel.module.css";

export default function TopJobsHomePanel({ className }) {
  const { data, isLoading, isError, error } = useJobs({
    limit: 5,
  });

  const jobs = data?.result?.jobs || [];
  
  return (
    <Panel className={className || ""}>
      <PanelTitle className={styles["panel-title"]}>Top Jobs</PanelTitle>

      {isLoading && <Loader className={styles["loader"]} />}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && !isError && (
        <List
          items={jobs}
          className={styles.list}
          keyExtractor={(job) => job._id}
          renderItem={(job) => (
            <div className={styles.job}>
              <JobItem job={job} />
            </div>
          )}
        />
      )}
    </Panel>
  );
}
