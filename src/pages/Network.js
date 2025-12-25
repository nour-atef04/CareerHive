import RequestsPanel from "../components/NetworkPanels/RequestsPanel";
import styles from "./Network.module.css";

export default function Network() {
  return (
    <main className={styles.main}>
      <RequestsPanel />
    </main>
  );
}
