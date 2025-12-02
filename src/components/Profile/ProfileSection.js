import styles from "./ProfileSection.module.css";

export default function ProfileSection({ children }) {
  return <div className={styles["profile-section"]}>{children}</div>;
}
