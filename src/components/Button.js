import styles from "./Button.module.css";

export default function Button({
  children,
  type = "button",
  onClick,
  className,
  disabled=false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className || ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
