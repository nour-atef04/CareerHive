import styles from "./Logo.module.css";
import logoImage from "../assets/logo-image.png";
import logoTitle from "../assets/logo-title.png";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <img
        className={styles["logo-image"]}
        src={logoImage}
        alt="CareerHive logo"
      />
      <img
        className={styles["logo-title"]}
        src={logoTitle}
        alt="CareerHive logo title"
      />
    </div>
  );
}
