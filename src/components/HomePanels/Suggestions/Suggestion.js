import styles from "./Suggestion.module.css";
import Button from "../../Button";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function Suggestion({ className, name, position }) {
  const [followed, setFollowed] = useState(false);
  const { dispatch } = useAuth();

  function handleFollow() {
    if (!followed) {
      setFollowed(true);
      dispatch({ type: "add_following" });
    } else {
      setFollowed(false);
      dispatch({ type: "delete_following" });
    }
  }

  return (
    <div className={`${className || ""} ${styles["suggestion"]}`}>
      <div className={styles["icon"]}></div>
      <div className={styles["info"]}>
        <p className={styles["name"]}>{name}</p>
        <p className={styles["position"]}>{position}</p>
      </div>
      <Button
        onClick={handleFollow}
        size="sm"
        variant={followed ? "filled" : "outline-dark"}
        className={styles["follow-btn"]}
      >
        {followed ? "−" : "+"}
      </Button>
    </div>
  );
}
