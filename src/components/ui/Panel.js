import styles from "./Panel.module.css";

export default function Panel({ className, children, topBorder = false }) {
  return (
    <div
      className={`${styles.panel} ${topBorder ? styles["top-border"] : ""} ${className || ""}`}
    >
      {children}
    </div>
  );
}
