import { useState } from "react";
import styles from "./ChatSearch.module.css";

export default function ChatSearch({ following, setFollowingList }) {
  const [searchChat, setSearchChat] = useState("");

  function handleInputChange(e) {
    const value = e.target.value;
    setSearchChat(value);
    const filtered = following.filter((person) =>
      person.toLowerCase().includes(value.toLowerCase())
    );

    setFollowingList(filtered);
  }

  return (
    <div className={styles["search"]}>
      <input
        type="text"
        placeholder="Search chat"
        value={searchChat}
        onChange={handleInputChange}
      />
    </div>
  );
}
