import styles from "./ChatSearch.module.css";
import FormInput from "../../ui/FormInput";
import { IoSearchOutline } from "react-icons/io5";

export default function ChatSearch({ searchQuery, setSearchQuery }) {
  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <div className={styles["search"]}>
      <IoSearchOutline aria-hidden="true" />
      <FormInput
        type="search"
        placeholder="Search chat"
        value={searchQuery}
        onChange={handleInputChange}
        aria-label="Search chats"
      />
    </div>
  );
}
