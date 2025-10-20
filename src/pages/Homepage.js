import LoginPanel from "../components/LoginPanel";
import MarketingPanel from "../components/MarketingPanel";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <div className={styles.container}>
      <LoginPanel />
      <MarketingPanel />
    </div>
  );
}
