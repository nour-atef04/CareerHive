import DeleteButton from "../../ui/DeleteButton";
import styles from "./PhotoPreview.module.css";

export default function PhotoPreview({ photoPreview, onRemove }) {
  return (
    <div className={styles["photo-preview"]}>
      <DeleteButton className={styles["delete-button"]} onClick={onRemove} />

      <img src={photoPreview} alt="post media" />
    </div>
  );
}
