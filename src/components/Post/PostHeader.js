import styles from "./PostHeader.module.css";
import userPfp from "../../assets/john.doe.jpg";

export default function PostHeader() {
  return (
    <div className={styles["header"]}>
      <img src={userPfp} alt="john doe" className={styles["icon"]} />
      <div>
        <h3 className={styles["name"]}>John Doe</h3>
        <p>Tech Enthusiast</p>
        <p>1d</p>
      </div>
    </div>
  );
}
