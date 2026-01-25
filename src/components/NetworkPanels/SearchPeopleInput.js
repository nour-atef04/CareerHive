import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useUsersByName } from "../../hooks/useUsers";
import FormInput from "../ui/FormInput";
import NetworkSearchResultsPanel from "./NetworkSearchResultsPanel";
import styles from "./SearchPeopleInput.module.css";

export default function SearchPeopleInput() {
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const { data: users, isLoading } = useUsersByName(submittedName);

  // debounce effect, when inputValue changes -> wait 500ms before updating submittedName
  useEffect(() => {
    //don't search if empty
    if (!inputValue.trim()) {
      setSubmittedName("");
      setOpenModal(false);
      return;
    }

    const timerId = setTimeout(() => {
      setSubmittedName(inputValue);
      setOpenModal(true);
    }, 500);

    // clean up function
    return () => clearTimeout(timerId);
  }, [inputValue]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <div className={styles.form}>
      <div className={styles.input}>
        <IoSearchOutline />
        <form onSubmit={handleSubmit}>
          <FormInput
            placeholder="Search people..."
            value={inputValue}
            onChange={handleChange}
          />
        </form>
      </div>

      {openModal && (
        <NetworkSearchResultsPanel
          inputValue={inputValue}
          results={users}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
