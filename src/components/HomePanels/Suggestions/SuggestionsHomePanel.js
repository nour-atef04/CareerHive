import { useAuth } from "../../../context/AuthContext";
import { useUserFollowings, useUserSuggestions } from "../../../hooks/useUsers";
import Panel from "../../ui/Panel";
import PanelTitle from "../../ui/PanelTitle";
import Suggestion from "./Suggestion";
import styles from "./SuggestionsHomePanel.module.css";
import Loader from "../../ui/Loader";
import List from "../../ui/List";
import { useMemo } from "react";

export default function SuggestionsHomePanel({ className }) {
  const { currentUser } = useAuth();
  const { data: allSuggestions = [], isLoading: isLoadingSuggestions } =
    useUserSuggestions(currentUser?.id);

  const { data: followings = [], isLoading: isLoadingFollowings } =
    useUserFollowings(currentUser?.id);

  // memoize to avoid re-run on every parent render
  const filteredSuggestions = useMemo(() => {
    if (!allSuggestions.length) return [];

    // using set for o(1) lookup
    const followingIds = new Set(followings.map((f) => f.id));

    return allSuggestions.filter((sug) => !followingIds.has(sug.id));
  }, [allSuggestions, followings]);

  const isLoading = isLoadingSuggestions || isLoadingFollowings;

  return (
    <Panel className={`${className || ""}`}>
      <PanelTitle className={styles["panel-title"]}>Suggestions</PanelTitle>

      {(!currentUser || isLoading) && <Loader />}

      {isLoading ? (
        <Loader />
      ) : (
        <List
          items={filteredSuggestions}
          className={styles.list}
          keyExtractor={(user) => user.id}
          renderItem={(suggestion) => (
            <Suggestion
              suggestion={suggestion}
              isFollowing={false}
            />
          )}
        />
      )}
    </Panel>
  );
}
