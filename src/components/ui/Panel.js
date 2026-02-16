import styles from "./Panel.module.css";

export default function Panel({ className, children, topBorder = false }) {
  return (
    <section
      className={`${styles.panel} ${topBorder ? styles["top-border"] : ""} ${className || ""}`}
    >
      {children}
    </section>
  );
}
