import styles from "./PremiumHomePanel.module.css";
import crown from "../../assets/crown.png";
import Button from "../Button";

export default function PremiumHomePanel({ className }) {
  return (
    <div className={`${styles["premium-panel"]} ${className || ""}`}>
      <div className={styles["header"]}>
        <img className={styles["crown"]} src={crown} alt="crown" />
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
      <Button filled={false}>Join Premium Now</Button>
    </div>
  );
}
