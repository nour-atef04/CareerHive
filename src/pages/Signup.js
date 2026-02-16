import { useEffect } from "react";
import MarketingPanel from "../components/LoginPanels/MarketingPanel";
import SignupPanel from "../components/LoginPanels/SignupPanel";
import styles from "./Login.module.css";

export default function Signup() {

    useEffect(() => {
      document.title = "Sign up | CareerHive";
  
      // cleanup to revert it when leave
      return () => {
        document.title = "CareerHive | Connect & Grow";
      };
    }, []);

  return (
    <main className={styles.container}>
      <SignupPanel />
      <MarketingPanel />
    </main>
  );
}
