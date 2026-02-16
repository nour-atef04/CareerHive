import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";
import List from "../ui/List";
import Loader from "../ui/Loader";
import Panel from "../ui/Panel";
import PanelTitle from "../ui/PanelTitle";
import Notification from "./Notification";
import styles from "./NotificationsList.module.css";

export default function NotificationsList() {
  const { currentUser } = useAuth();
  const { data = [], isLoading } = useNotifications(currentUser.id);

  return (
    <Panel className={styles["notifications-container"]} aria-label="Notifications">
      <PanelTitle type="h3">Notifications</PanelTitle>
      {isLoading ? (
        <Loader />
      ) : (
        <List
          className={styles.list}
          items={data}
          renderItem={(n) => <Notification notification={n} />}
          keyExtractor={(n) => n.id}
          emptyMessage="No notifications yet."
        />
      )}
    </Panel>
  );
}
