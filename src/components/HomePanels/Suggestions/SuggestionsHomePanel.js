import { useAuth } from "../../../context/AuthContext";
import { useUserSuggestions } from "../../../hooks/useUsers";
import Panel from "../../ui/Panel";
import PanelTitle from "../../ui/PanelTitle";
import Suggestion from "./Suggestion";
import styles from "./SuggestionsHomePanel.module.css";
import Loader from "../../ui/Loader";
import List from "../../ui/List";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SuggestionsHomePanel({ className }) {
  const { currentUser } = useAuth();
  const {
    data: suggestions = {},
    isLoading,
    refetch,
  } = useUserSuggestions(currentUser?.id);

  const location = useLocation();

  // refetch when the user navigates back to the page
  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  if (!currentUser || isLoading) return <Loader />;

  return (
    <Panel className={`${styles["suggestions-container"]} ${className || ""}`}>
      <PanelTitle className={styles["panel-title"]}>Suggestions</PanelTitle>

      {(!currentUser || isLoading) && <Loader className={styles.loader} />}

      {currentUser && !isLoading && (
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
      )}
    </Panel>
  );
}
