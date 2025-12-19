import Panel from "../../ui/Panel";
import PanelTitle from "../../ui/PanelTitle";
import Suggestion from "./Suggestion";
import styles from "./SuggestionsHomePanel.module.css";

const suggestions = [
  {
    id: "10",
    name: "Julia Esteve",
    position: "Software Engineer",
  },
  {
    id: "11",
    name: "Dereck Oswald",
    position: "Marketing Director",
  },
  {
    id: "12",
    name: "Enid Fletcher",
    position: "Data Engineer",
  },
  {
    id: "13",
    name: "Martin Sandford",
    position: "Accounting Specialist",
  },
  {
    id: "14",
    name: "Julia Esteve",
    position: "Software Engineer",
  },
  {
    id: "15",
    name: "Dereck Oswald",
    position: "Marketing Director",
  },
  {
    id: "16",
    name: "Enid Fletcher",
    position: "Data Engineer",
  },
  {
    id: "17",
    name: "Martin Sandford",
    position: "Accounting Specialist",
  },
];

export default function SuggestionsHomePanel({ className }) {
  return (
    <Panel className={`${styles["suggestions-container"]} ${className || ""}`}>
      <PanelTitle className={styles["panel-title"]}>Suggestions</PanelTitle>
      {suggestions.map((suggestion, i) => (
        <Suggestion
          className={styles.suggestion}
          key={i}
          name={suggestion.name}
          position={suggestion.position}
        />
      ))}
    </Panel>
  );
}
