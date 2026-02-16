import MarketingPanel from "../components/LoginPanels/MarketingPanel";
import SignupPanel from "../components/LoginPanels/SignupPanel";
import styles from "./Login.module.css";

export default function Signup() {
  return (
    <main className={styles.container}>
      <SignupPanel />
      <MarketingPanel />
    </main>
  );
}
