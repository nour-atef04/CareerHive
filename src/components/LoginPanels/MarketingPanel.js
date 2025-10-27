import styles from "./MarketingPanel.module.css"

export default function MarketingPanel() {
  return (
    <div className={styles["marketing-panel"]}>
      <h1 className={styles["marketing-title"]}>
        Your Next
        <br /> Opportunity Awaits
      </h1>
      <ul className={styles["marketing-description"]}>
        <li>Connect with over million professionals.</li>
        <li>Access curated job listings from top companies.</li>
        <li>Build professional brand and network.</li>
      </ul>
    </div>
  );
}
