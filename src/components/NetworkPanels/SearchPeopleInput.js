import { IoSearchOutline } from "react-icons/io5";
import FormInput from "../ui/FormInput";
import styles from "./SearchPeopleInput.module.css";
import { useState } from "react";
import Modal from "../ui/Modal";
import { useUsersByName } from "../../hooks/useUsers";
import List from "../ui/List";
import PersonLi from "../ui/PersonLi";
import Loader from "../ui/Loader";
import PanelTitle from "../ui/PanelTitle";

export default function SearchPeopleInput() {
  const [openModal, setOpenModal] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const { data: users, isLoading } = useUsersByName(submittedName);

  function handleSubmit(e) {
    e.preventDefault();
    setOpenModal(true);
    setSubmittedName(inputValue);
  }

  return (
    <div className={styles.form}>
      <IoSearchOutline />
      <form onSubmit={handleSubmit}>
        <FormInput
          placeholder="Search people..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <PanelTitle className={styles.title} type="h2">
            Results for: {inputValue}
          </PanelTitle>
          {!isLoading ? (
            <List
              items={users}
              renderItem={(user) => (
                <PersonLi className={styles["person-li"]} person={user} />
              )}
              keyExtractor={(user) => user.id}
            />
          ) : (
            <Loader className={styles.loader} />
          )}
        </Modal>
      )}
    </div>
  );
}
