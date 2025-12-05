import styles from "./PostInteractions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { LuSend } from "react-icons/lu";
import {
  toggleComments,
  toggleLikeAsync,
} from "../../redux/slices/postUiSlice";

export default function PostInteractions({ postId }) {
  const dispatch = useDispatch();
  const liked = useSelector((state) => state.postUi[postId]?.liked);

  return (
    <div className={styles["interactions"]}>
      <div
        onClick={() => dispatch(toggleLikeAsync(postId))}
        className={liked ? styles["liked"] : ""}
      >
        {liked ? (
          <AiFillLike style={{ fontSize: "larger" }} />
        ) : (
          <AiOutlineLike style={{ fontSize: "larger" }} />
        )}
        <span>Like</span>
      </div>
      <div
        onClick={() => {
          dispatch(toggleComments(postId));
        }}
      >
        <FaRegComment />
        <span>Comment</span>
      </div>
      <div>
        <BiRepost style={{ fontSize: "large" }} />
        Repost
      </div>
      <div>
        <LuSend />
        Send
      </div>
    </div>
  );
}
