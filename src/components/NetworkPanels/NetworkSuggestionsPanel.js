import Panel from "../ui/Panel";
import PanelTitle from "../ui/PanelTitle";
import styles from "./NetworkSuggestionsPanel.module.css";
import { useUserRequests, useUserSuggestions } from "../../hooks/useUsers";
import Loader from "../ui/Loader";
import NetworkSuggestion from "./NetworkSuggestion";
import { useAuth } from "../../context/AuthContext";
import List from "../ui/List";

export default function NetworkSuggestionsPanel() {
  const { currentUser } = useAuth();
  const { data: suggestions = [], isLoading: isLoadingUsers } =
    useUserSuggestions(currentUser?.id);
  const { data: requests = [], isLoading: isLoadingRequests } = useUserRequests(
    currentUser?.id,
  );

  const filteredSuggestions = suggestions.filter(
    (sug) => !requests.some((r) => r.id === sug.id),
  );

  return (
    <Panel
      className={styles["suggestions-container"]}
      aria-label="People you may know"
    >
      <PanelTitle className={styles["suggestions-title"]} type="h3">
        More suggestions
      </PanelTitle>
      {isLoadingUsers || isLoadingRequests ? (
        <Loader />
      ) : (
        <List
          items={filteredSuggestions}
          className={styles["suggestions-list"]}
          keyExtractor={(user) => user.id}
          renderItem={(user) => <NetworkSuggestion user={user} />}
        />
      )}
    </Panel>
  );
}
