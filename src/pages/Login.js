import LoginPanel from "../components/FormPanel";
import MarketingPanel from "../components/MarketingPanel";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <LoginPanel />
      <MarketingPanel />
    </div>
  );
}
