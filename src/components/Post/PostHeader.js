import styles from "./PostHeader.module.css";
import userPfp from "../../assets/john.doe.jpg";
import ProfileIcon from "../ProfileIcon";

export default function PostHeader() {
  return (
    <div className={styles["header"]}>
      <ProfileIcon src={userPfp} alt="john doe" size="medium" />
      <div>
        <h3 className={styles["name"]}>John Doe</h3>
        <p>Tech Enthusiast</p>
        <p>1d</p>
      </div>
    </div>
  );
}
