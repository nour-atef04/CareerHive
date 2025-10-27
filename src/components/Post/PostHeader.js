import styles from "./PostHeader.module.css"

export default function PostHeader() {
  return (
    <div className={styles["header"]}>
      <div className={styles["icon"]}></div>
      <div>
        <h3 className={styles["name"]}>John Doe</h3>
        <p>Tech Enthusiast</p>
        <p>1d</p>
      </div>
    </div>
  );
}
