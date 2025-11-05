// import styles from "./PostHeader.module.css";
// import userPfp from "../../assets/john.doe.jpg";
// import ProfileIcon from "../ProfileIcon";

// export default function PostHeader() {
//   return (
//     <div className={styles["header"]}>
//       <ProfileIcon src={userPfp} alt="john doe" size="medium" />
//       <div>
//         <h3 className={styles["name"]}>John Doe</h3>
//         <p>Tech Enthusiast</p>
//         <p>1d</p>
//       </div>
//     </div>
//   );
// }

import styles from "./PostHeader.module.css";
import ProfileIcon from "../ProfileIcon";

export default function PostHeader({ post }) {
  const { authorName, authorImage, authorPosition, date } = post;

  // compute relative date
  const timeAgo = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diffHours = Math.floor(
    (Date.now() - new Date(date)) / (1000 * 60 * 60)
  );
  const relative =
    diffHours < 24
      ? timeAgo.format(-diffHours, "hour")
      : timeAgo.format(-Math.floor(diffHours / 24), "day");

  return (
    <div className={styles["header"]}>
      <ProfileIcon
        src={`/assets/${authorImage}.jpg`}
        alt={authorName}
        size="medium"
      />
      <div>
        <h3 className={styles["name"]}>{authorName}</h3>
        <p>{authorPosition}</p>
        <p>{relative}</p>
      </div>
    </div>
  );
}
