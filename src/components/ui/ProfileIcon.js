import styles from "./ProfileIcon.module.css";

const DEFAULT_AVATAR = "/default-user.png";

export default function ProfileIcon({
  src,
  alt = "User avatar",
  className,
  size = "small",
  onClick,
}) {
  let sizeClassName;

  switch (size) {
    case "small":
      sizeClassName = "small";
      break;
    case "medium":
      sizeClassName = "medium";
      break;
    case "large":
      sizeClassName = "large";
      break;
    default:
      sizeClassName = "";
  }

  let imageSource = DEFAULT_AVATAR;

  if (src && src.startsWith("http")) {
    imageSource = src;
  } else if (src && src !== "default-user") {
    // old test users
    imageSource = `/assets/${src}.jpg`;
  }

  return (
    <img
      // src={src || "/default-user.jpg"}
      src={imageSource}
      alt={alt}
      className={`${styles["profile-icon"]} ${className || ""} ${
        styles[sizeClassName]
      }`}
      onClick={onClick || null}
    />
  );
}
