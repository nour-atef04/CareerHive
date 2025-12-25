import styles from "./PostHeader.module.css";
import ProfileIcon from "../ui/ProfileIcon";
import { useNavigate } from "react-router-dom";

export default function PostHeader({ post }) {
  const navigate = useNavigate();

  const { authorId, authorName, authorImage, authorPosition, date } = post;

  const postDate = new Date(date);
  const timeAgo = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  let relative;
  if (!isNaN(postDate)) {
    const diffHours = Math.floor((Date.now() - postDate) / (1000 * 60 * 60));
    relative =
      diffHours < 24
        ? timeAgo.format(-diffHours, "hour")
        : timeAgo.format(-Math.floor(diffHours / 24), "day");
  } else {
    relative = "unknown time";
  }

  return (
    <div className={styles["header"]}>
      <ProfileIcon
        src={`/assets/${authorImage}.jpg`}
        alt={authorName}
        size="medium"
        onClick={() => navigate(`/profile/${authorId}`)}
      />
      <div>
        <h3 className={styles["name"]}>{authorName}</h3>
        <p>{authorPosition}</p>
        <p>{relative}</p>
      </div>
    </div>
  );
}
