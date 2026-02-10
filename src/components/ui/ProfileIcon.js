import styles from "./ProfileIcon.module.css";

const DEFAULT_AVATAR = "/default-user.png";

export default function ProfileIcon({
  src,
  alt = "User avatar",
  className,
  size = "small",
  onClick,
}) {

  let imageSource = DEFAULT_AVATAR;

  if (src && src.startsWith("http")) {
    imageSource = src;
  } else if (src && src !== "default-user") {
    // old test users
    imageSource = `/assets/${src}.jpg`;
  }

  return (
    <img
      src={imageSource}
      alt={alt}
      className={`${styles["profile-icon"]} ${className || ""} ${styles[size]}`}
      onClick={onClick}
    />
  );
}
