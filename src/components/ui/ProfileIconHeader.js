import ProfileIcon from "./ProfileIcon";
import styles from "./ProfileIconHeader.module.css";

export default function ProfileIconHeader({
  type = "centered",
  src,
  alt,
  onClick,
}) {
  // Handle keyboard activation (Enter or Space)
  const handleKeyDown = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`${styles["profile-summary-header"]} ${styles[type]}`}
      onClick={onClick}
      role={onClick ? "button" : "presentation"}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={handleKeyDown}
      aria-label={onClick ? "View Profile" : undefined}
    >
      <ProfileIcon src={src} alt={alt} size="large" className={styles.avatar} />
    </div>
  );
}
