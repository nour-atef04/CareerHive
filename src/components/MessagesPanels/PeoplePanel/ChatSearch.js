import { useState } from "react";
import styles from "./ChatSearch.module.css";
import FormInput from "../../ui/FormInput";

export default function ChatSearch({
  followingsList,
  setFilteredFollowings,
}) {
  const [searchChat, setSearchChat] = useState("");

  function handleInputChange(e) {
    const value = e.target.value;
    setSearchChat(value);
    const filtered =
      value.trim() === ""
        ? followingsList
        : followingsList.filter((person) =>
            person.name.toLowerCase().includes(value.toLowerCase())
          );

    setFilteredFollowings(filtered);
  }

  return (
    <div className={styles["search"]}>
      <FormInput
        type="text"
        placeholder="Search chat"
        value={searchChat}
        onChange={handleInputChange}
      />
    </div>
  );
}