import styles from "./ProfileStats.module.css";

export default function ProfileStats({
  className,
  followersCount,
  followingsCount,
}) {
  return (
    <div className={`${styles["profile-stats"]} ${className || ""}`}>
      <span>{followingsCount} followers</span>
      <span> • </span>
      <span>{followingsCount} followings</span>
    </div>
  );
}
