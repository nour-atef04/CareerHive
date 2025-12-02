import styles from "./DateSeperator.module.css";

export default function DateSeperator({ children }) {
  return <div className={styles["date-separator"]}>{children}</div>;
}
