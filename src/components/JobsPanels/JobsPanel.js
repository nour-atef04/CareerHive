import Panel from "../ui/Panel";
import PanelTitle from "../ui/PanelTitle";
import JobsListPanel from "./JobsListPanel";
import styles from "./JobsPanel.module.css";

export default function JobsPanel({ className }) {
  return (
    <Panel className={`${className || ""} ${styles["jobs-container"]}`}>
      <PanelTitle type="h3">Top jobs for you</PanelTitle>
      <JobsListPanel />
    </Panel>
  );
}
