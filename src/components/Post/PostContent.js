import { useNavigate } from "react-router-dom";
import styles from "./PostContent.module.css";

export default function PostContent({ post }) {
  const { text, photo } = post;
  const navigate = useNavigate();

  return (
    <>
      <div className={styles["content"]}>
        <p onClick={() => navigate(`/post/${post.id}`)}>{text}</p>
      </div>
      {photo && <img src={photo} alt="post media" />}
    </>
  );
}
