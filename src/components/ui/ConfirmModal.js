import Button from "./Button";
import styles from "./ConfirmModal.module.css";
import Modal from "./Modal";

export default function ConfirmModal({
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  return (
    <Modal onClose={onCancel} className={styles.modal}>
      <h3>{title}</h3>
      <p>{message}</p>
      <div className={styles.actions}>
        <Button variant="outline-dark" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant="filled" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
