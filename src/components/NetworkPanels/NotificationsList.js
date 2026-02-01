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
    <Panel className={styles["notifications-container"]}>
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

// {
//     "id": 5,
//     "recipientId": "6849c316-6c78-440d-98ab-427fa6bdd04d",
//     "senderId": "b7726334-5a64-4065-b85e-4b761c98e42f",
//     "postId": "2ae8995d-14d9-4270-83c0-df1c31b99275",
//     "type": "like",
//     "read": false,
//     "created_at": "2026-02-01T14:13:17.900691+00:00",
//     "sender": {
//         "name": "John Doe",
//         "image": "john.doe"
//     },
//     "post": {
//         "text": "Excited to start a new project!! <3 "
//     }
// }
