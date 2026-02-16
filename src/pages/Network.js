import NetworkSuggestionsPanel from "../components/NetworkPanels/NetworkSuggestionsPanel";
import RequestsPanel from "../components/NetworkPanels/RequestsPanel";
import styles from "./Network.module.css";
import SearchPeopleInput from "../components/NetworkPanels/SearchPeopleInput";
import NotificationsList from "../components/NetworkPanels/NotificationsList";
import { useEffect } from "react";

export default function Network() {

    useEffect(() => {
      document.title = "Network | CareerHive";
  
      // cleanup to revert it when leave
      return () => {
        document.title = "CareerHive | Connect & Grow";
      };
    }, []);

  return (
    <main className={styles.main}>
      <SearchPeopleInput />
      <RequestsPanel />
      <NotificationsList />
      <NetworkSuggestionsPanel />
    </main>
  );
}
