import styles from "./ProfileIcon.module.css";

export default function ProfileIcon({ src, alt, className, size = "small" }) {

  let sizeClassName;

  switch(size){
    case "small": sizeClassName = "small"
      break;
    case "medium": sizeClassName = "medium"
      break;
    case "large": sizeClassName = "large"
      break;
    default: sizeClassName = ""
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${styles["profile-icon"]} ${className || ""} ${styles[sizeClassName]}`}
    />
  );
}
