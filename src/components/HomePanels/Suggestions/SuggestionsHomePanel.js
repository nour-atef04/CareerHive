import Panel from "../../ui/Panel";
import PanelTitle from "../../ui/PanelTitle";
import Suggestion from "./Suggestion";
import styles from "./SuggestionsHomePanel.module.css";

const suggestions = [
  {
    name: "Julia Esteve",
    position: "Software Engineer",
  },
  {
    name: "Dereck Oswald",
    position: "Marketing Director",
  },
  {
    name: "Enid Fletcher",
    position: "Data Engineer",
  },
  {
    name: "Martin Sandford",
    position: "Accounting Specialist",
  },
  {
    name: "Julia Esteve",
    position: "Software Engineer",
  },
  {
    name: "Dereck Oswald",
    position: "Marketing Director",
  },
  {
    name: "Enid Fletcher",
    position: "Data Engineer",
  },
  {
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
