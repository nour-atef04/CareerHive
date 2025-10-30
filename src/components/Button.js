import styles from "./Button.module.css";

export default function Button({
  children,
  type = "button",
  onClick,
  className,
  disabled=false,
  filled=true
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className || ""} ${filled ? "" : styles["non-filled"]}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
