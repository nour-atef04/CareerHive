import styles from "./ProfileNamePosition.module.css";

export default function ProfileNamePosition({ className, name, position }) {
  return (
    <div className={className || ""}>
      <p className={styles["profile-name"]}>{name}</p>
      <p className={styles["profile-position"]}>{position}</p>
    </div>
  );
}
