import styles from "./Comment.module.css";

export default function Comment({children}) {
  return (
    <div className={styles["comment"]}>
      <div className={styles["commenter-header"]}>
        <div className={styles["comment-icon"]}></div>
        <div>
          <p className={styles["name"]}>John Doe</p>
          <p>Tech Enthusiast</p>
        </div>
      </div>
      <div className={styles["comment-content"]}>{children}</div>
    </div>
  );
}
