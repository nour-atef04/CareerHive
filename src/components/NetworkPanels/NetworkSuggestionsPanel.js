import Panel from "../ui/Panel";
import PanelTitle from "../ui/PanelTitle";
import styles from "./NetworkSuggestionsPanel.module.css";
import { useUserSuggestions } from "../../hooks/useUsers";
import Loader from "../ui/Loader";
import NetworkSuggestion from "./NetworkSuggestion";
import { useAuth } from "../../context/AuthContext";
import List from "../ui/List";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NetworkSuggestions() {
  const { currentUser } = useAuth();
  const { data: suggestions = {}, isLoading: isLoadingUsers, refetch } =
    useUserSuggestions(currentUser?.id);

  const location = useLocation();

  // refetch when the user navigates back to the page
  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  if (!currentUser || isLoadingUsers) return <Loader />;

  return (
    <Panel className={styles["suggestions-container"]}>
      <PanelTitle className={styles["suggestions-title"]} type="h3">
        More suggestions
      </PanelTitle>
      {isLoadingUsers ? (
        <Loader />
      ) : (
        <List
          items={suggestions}
          className={styles["suggestions-list"]}
          keyExtractor={(user) => user.id}
          renderItem={(user) => <NetworkSuggestion user={user} />}
        />
      )}
    </Panel>
  );
}
