import Panel from "../ui/Panel";
import PanelTitle from "../ui/PanelTitle";
import styles from "./NetworkSuggestions.module.css";
import ProfileIconHeader from "../ui/ProfileIconHeader";
import { useUsers } from "../../hooks/useUsers";
import ProfileNamePosition from "../ui/ProfileNamePosition";
import Loader from "../ui/Loader";

export default function NetworkSuggestions() {
  const { data: users, isLoading: isLoadingUsers } = useUsers();

  return (
    <Panel className={styles["suggestions-container"]}>
      <PanelTitle className={styles["suggestions-title"]} type="h3">
        More suggestions
      </PanelTitle>
      {isLoadingUsers ? (
        <Loader />
      ) : (
        <div className={styles["suggestions-list"]}>
          {users.map((user) => (
            <div className={styles["suggestion"]}>
              <Panel className={styles["suggestion-card"]}>
                <ProfileIconHeader type="centered" />
                <div className={styles["suggestion-body"]}>
                  <ProfileNamePosition
                    className={styles["profile-info"]}
                    name={user.name}
                    position={user.position}
                  />
                </div>
              </Panel>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
