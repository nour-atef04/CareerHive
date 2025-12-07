import Panel from "../ui/Panel";
import styles from "./ProfileSection.module.css";

export default function ProfileSection({ children }) {
  return <Panel className={styles["profile-section"]}>{children}</Panel>;
}
