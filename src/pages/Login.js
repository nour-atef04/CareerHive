import { useEffect } from "react";
import LoginPanel from "../components/LoginPanels/LoginPanel";
import MarketingPanel from "../components/LoginPanels/MarketingPanel";
import styles from "./Login.module.css";

export default function Login() {
  useEffect(() => {
    document.title = "Login | CareerHive";

    // cleanup to revert it when leave
    return () => {
      document.title = "CareerHive | Connect & Grow";
    };
  }, []);

  return (
    <div className={styles.container}>
      <LoginPanel />
      <MarketingPanel />
    </div>
  );
}
