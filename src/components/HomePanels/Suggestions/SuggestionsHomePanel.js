import { useAuth } from "../../../context/AuthContext";
import { useUsers } from "../../../hooks/useUsers";
import Panel from "../../ui/Panel";
import PanelTitle from "../../ui/PanelTitle";
import Suggestion from "./Suggestion";
import styles from "./SuggestionsHomePanel.module.css";
import Loader from "../../ui/Loader";
import List from "../../ui/List";

export default function SuggestionsHomePanel({ className }) {
  const { currentUser } = useAuth();
  const { data: users = [], isLoading } = useUsers();

  if (!currentUser || isLoading) return <Loader />;

  const suggestions = users
    .filter((user) => user.id !== currentUser.id)
    .slice(0, 5);

  return (
    <Panel className={`${styles["suggestions-container"]} ${className || ""}`}>
      <PanelTitle className={styles["panel-title"]}>Suggestions</PanelTitle>
      <List
        items={suggestions}
        className={styles.list}
        keyExtractor={(user) => user.id}
        renderItem={(suggestion) => (
          <Suggestion
            suggestion={suggestion}
            isFollowing={currentUser.followingIds?.includes(suggestion.id)}
          />
        )}
      />
    </Panel>
  );
}
