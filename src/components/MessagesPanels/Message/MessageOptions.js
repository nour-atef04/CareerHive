import styles from "./MessageOptions.module.css";

export default function MessageOptions({
  setIsEditing,
  setDeleteConfirmation,
  setLockOptionsOpen,
}) {
  return (
    <>
      <span
        className={styles["option"]}
        onClick={() => setIsEditing((isEditing) => !isEditing)}
      >
        Edit
      </span>
      <span
        className={styles["option"]}
        onClick={() => {
          setDeleteConfirmation(true);
          setLockOptionsOpen(true);
        }}
      >
        Delete
      </span>
    </>
  );
}
