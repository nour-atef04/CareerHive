import styles from "./PostInteractions.module.css";
import like from "../../assets/like.png";
import comment from "../../assets/comment.png";
import repost from "../../assets/repost.png";
import send from "../../assets/send.png";
import like2 from "../../assets/like2.png";
import { usePost } from "../../context/PostContext";

export default function PostInteractions() {
  const { state, dispatch } = usePost();
  const { liked } = state;

  return (
    <div className={styles["interactions"]}>
      <div
        onClick={() => dispatch({ type: "toggle_like" })}
        className={liked ? styles["liked"] : ""}
      >
        <img src={liked ? like2 : like} alt="like post" />
        Like
      </div>
      <div onClick={() => dispatch({ type: "toggle_comments" })}>
        <img src={comment} alt="comment on post" />
        Comment
      </div>
      <div>
        <img src={repost} alt="repost" />
        Repost
      </div>
      <div>
        <img src={send} alt="send post" />
        Send
      </div>
    </div>
  );
}
