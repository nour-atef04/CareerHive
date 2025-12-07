import styles from "./PremiumHomePanel.module.css";
import { PiCrownSimpleFill } from "react-icons/pi";
import Button from "../ui/Button";
import Panel from "../ui/Panel";

export default function PremiumHomePanel({ className }) {
  return (
    <Panel className={`${styles["premium-panel"]} ${className || ""}`}>
      <div className={styles["header"]}>
        <PiCrownSimpleFill style={{ fontSize: "larger", color: "orange" }} />
        <p>Unlock Your Full Potential</p>
      </div>
      <h2>CareerHive Premium</h2>
      <ul>
        <li>✓ Exclusive Job Insights</li>
        <li>✓ In-depth Salary Data</li>
        <li>✓ Who's Viewed Your Profile</li>
        <li>✓ Interview Prep Tools</li>
        <li>✓ Learning Courses</li>
      </ul>
      <Button variant="outline" color="brand2">
        Join Premium Now
      </Button>
    </Panel>
  );
}
