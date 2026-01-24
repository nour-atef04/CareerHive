import styles from "./ChatSearch.module.css";
import FormInput from "../../ui/FormInput";

export default function ChatSearch({ searchQuery, setSearchQuery }) {
  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <div className={styles["search"]}>
      <FormInput
        type="text"
        placeholder="Search chat"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
}
