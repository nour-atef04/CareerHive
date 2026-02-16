import styles from "./Logo.module.css";

export default function Logo({ className }) {
  return (
    <div className={`${styles.logo} ${className || ""}`}>
      <img
        className={styles["logo-image"]}
        src="/assets/logo-image.png"
        alt="CareerHive logo"
      />
      <img
        className={styles["logo-title"]}
        src="/assets/logo-title.png"
        alt="CareerHive logo title"
      />
    </div>
  );
}
