import styles from "./Panel.module.css";

export default function Panel({ className, children, topBorder = false }) {
  const topBorderClass = styles[`${topBorder && "top-border"}`];

  return (
    <div className={`${styles.panel} ${className || ""} ${topBorderClass}`}>
      {children}
    </div>
  );
}
