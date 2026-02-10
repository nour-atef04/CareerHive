import ProfileIcon from "./ProfileIcon";
import styles from "./ProfileIconHeader.module.css";

export default function ProfileIconHeader({
  type = "centered",
  src,
  alt,
  onClick,
}) {
  return (
    <div
      className={`${styles["profile-summary-header"]} ${styles[type]}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <ProfileIcon src={src} alt={alt} size="large" className={styles.avatar} />
    </div>
  );
}
