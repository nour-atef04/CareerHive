import NetworkSuggestionsPanel from "../components/NetworkPanels/NetworkSuggestionsPanel";
import RequestsPanel from "../components/NetworkPanels/RequestsPanel";
import styles from "./Network.module.css";
import SearchPeopleInput from "../components/NetworkPanels/SearchPeopleInput";
import NotificationsList from "../components/NetworkPanels/NotificationsList";

export default function Network() {
  return (
    <main className={styles.main}>
      <SearchPeopleInput />
      <RequestsPanel />
      <NotificationsList />
      <NetworkSuggestionsPanel />
    </main>
  );
}
