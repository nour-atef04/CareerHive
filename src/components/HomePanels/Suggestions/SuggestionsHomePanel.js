import { useAuth } from "../../../context/AuthContext";
import { useUserFollowings, useUserSuggestions } from "../../../hooks/useUsers";
import Panel from "../../ui/Panel";
import PanelTitle from "../../ui/PanelTitle";
import Suggestion from "./Suggestion";
import styles from "./SuggestionsHomePanel.module.css";
import Loader from "../../ui/Loader";
import List from "../../ui/List";

export default function SuggestionsHomePanel({ className }) {
  const { currentUser } = useAuth();
  const { data: suggestions = [], isLoading: isLoadingSuggestions } =
    useUserSuggestions(currentUser?.id);

  const { data: followings = [], isLoading: isLoadingFollowings } =
    useUserFollowings(currentUser?.id);

  const filteredSuggestions = suggestions.filter(
    (sug) => !followings.some((f) => f.id === sug.id),
  );

  const isLoading = isLoadingSuggestions || isLoadingFollowings;

  return (
    <Panel className={`${className || ""}`}>
      <PanelTitle className={styles["panel-title"]}>Suggestions</PanelTitle>

      {(!currentUser || isLoading) && <Loader />}

      {currentUser && !isLoading && (
        <List
          items={filteredSuggestions}
          className={styles.list}
          keyExtractor={(user) => user.id}
          renderItem={(suggestion) => (
            <Suggestion suggestion={suggestion} isFollowing={false} />
          )}
        />
      )}
    </Panel>
  );
}
