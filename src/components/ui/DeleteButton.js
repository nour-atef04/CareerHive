import styles from "./DeleteButton.module.css";

export default function DeleteButton({ onClick, className }) {
  return (
    <button
      aria-label="Delete"
      onClick={onClick}
      className={`${styles["delete-btn"]} ${className || ""}`}
    >
      ✕
    </button>
  );
}
