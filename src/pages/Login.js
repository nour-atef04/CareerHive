import LoginPanel from "../components/LoginPanels/FormPanel";
import MarketingPanel from "../components/LoginPanels/MarketingPanel";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <LoginPanel />
      <MarketingPanel />
    </div>
  );
}
