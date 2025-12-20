import styles from "./PersonLi.module.css";

export default function PersonLi({ className, person, children = "" }) {
  const { name, position } = person;
  return (
    <div className={`${className || ""} ${styles["person"]}`}>
      <div className={styles["icon"]}></div>
      <div className={styles["info"]}>
        <p className={styles["name"]}>{name}</p>
        <p className={styles["position"]}>{position}</p>
      </div>
      {children}
    </div>
  );
}
