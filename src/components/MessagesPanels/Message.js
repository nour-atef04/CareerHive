import styles from "./Message.module.css";

export default function Message({ person, children }) {
  const messageStyle = {
    1: styles["my-message"],
    2: styles["message-other-person"],
  };

  return (
    <div className={messageStyle[person]}>
      <p>{children}</p>
      <p className={styles["time"]}>12:30am</p>
    </div>
  );
}
