import styles from "./Message.module.css";

function formatFullTimestamp(isoString) {
  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const mins = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} · ${hours}:${mins}`;
}

export default function Message({ person, currentUser, time, children }) {
  const messageStyle =
    person === currentUser
      ? styles["my-message"]
      : styles["message-other-person"];

  return (
    <div className={messageStyle}>
      <p>{children}</p>
      <p className={styles["time"]}>{formatFullTimestamp(time)}</p>
    </div>
  );
}
