import styles from "./PostHeader.module.css";
import ProfileIcon from "../ui/ProfileIcon";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUsers";
import Loader from "../ui/Loader";

export default function PostHeader({ post }) {
  const navigate = useNavigate();

  const { data: user = {}, isLoading } = useUser(post.authorId);

  const { id, name, image, position } = user;
  const date = post.createdAt;

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
      {!isLoading ? (
        <>
          <ProfileIcon
            src={`/assets/${image}.jpg`}
            alt={name}
            size="medium"
            onClick={() => navigate(`/profile/${id}`)}
          />
          <div>
            <h3 className={styles["name"]}>{name}</h3>
            <p>{position}</p>
            <p>{relative}</p>
          </div>{" "}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
