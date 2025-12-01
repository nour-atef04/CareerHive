import styles from "./PostInteractions.module.css";
import like from "../../assets/like.png";
import comment from "../../assets/comment.png";
import repost from "../../assets/repost.png";
import send from "../../assets/send.png";
import like2 from "../../assets/like2.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleComments, toggleLike } from "../../redux/slices/postUiSlice";

export default function PostInteractions({ postId }) {
  const dispatch = useDispatch();
  const liked = useSelector((state) => state.postUi[postId]?.liked);

  return (
    <div className={styles["interactions"]}>
      <div
        onClick={() => dispatch(toggleLike(postId))}
        className={liked ? styles["liked"] : ""}
      >
        <img src={liked ? like2 : like} alt="like post" />
        Like
      </div>
      <div onClick={() => dispatch(toggleComments(postId))}>
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
