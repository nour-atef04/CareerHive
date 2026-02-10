import styles from "./PremiumHomePanel.module.css";
import { PiCheckBold, PiCrownSimpleFill } from "react-icons/pi";
import Button from "../ui/Button";
import Panel from "../ui/Panel";

const PREMIUM_FEATURES = [
  "Exclusive Job Insights",
  "In-depth Salary Data",
  "Who's Viewed Your Profile",
  "Interview Prep Tools",
  "Learning Courses",
];

export default function PremiumHomePanel({ className }) {
  return (
    <Panel className={`${styles["premium-panel"]} ${className || ""}`}>
      <div className={styles["header"]}>
        <PiCrownSimpleFill className={styles.crown} aria-hidden="true" />
        <p>Unlock Your Full Potential</p>
      </div>
      <h2>CareerHive Premium</h2>
      <ul>
        {PREMIUM_FEATURES.map((feature, index) => (
          <li key={index}>
            <PiCheckBold className={styles["check-icon"]} aria-hidden="true" />{" "}
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button variant="outline" color="brand2">
        Join Premium Now
      </Button>
    </Panel>
  );
}
