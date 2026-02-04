import List from "../ui/List";
import Panel from "../ui/Panel";
import Loader from "../ui/Loader";
import PanelTitle from "../ui/PanelTitle";
import styles from "./NetworkSearchResultsPanel.module.css";
import PersonLi from "../ui/PersonLi";

export default function NetworkSearchResultsPanel({
  inputValue,
  results,
  isLoading,
}) {
  return (
    <Panel className={styles.panel}>
      <PanelTitle className={styles.title} type="h3">
        Results for:{inputValue}
      </PanelTitle>
      {isLoading ? (
        <Loader />
      ) : (
        <List
          keyExtractor={(result) => result.id}
          items={results}
          renderItem={(result) => (
            <PersonLi className={styles["person-li"]} person={result} />
          )}
        />
      )}
    </Panel>
  );
}
