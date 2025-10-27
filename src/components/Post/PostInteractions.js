import styles from "./PostInteractions.module.css";
import like from "../../assets/like.png";
import comment from "../../assets/comment.png";
import repost from "../../assets/repost.png";
import send from "../../assets/send.png";
import like2 from "../../assets/like2.png";

export default function PostInteractions({ liked, onLike, onOpenComments }) {
  return (
    <div className={styles["interactions"]}>
      <div onClick={onLike} className={liked ? styles["liked"] : ""}>
        <img src={liked ? like2 : like} alt="like post" />
        Like
      </div>
      <div onClick={onOpenComments}>
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
