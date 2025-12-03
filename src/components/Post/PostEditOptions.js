import { useDispatch } from "react-redux";
import styles from "./PostEditOptions.module.css";
import { deletePost } from "../../redux/slices/postsSlice";

export default function PostEditOptions({
  post,
  openOptionsPostId,
  setOpenOptionsPostId,
  setEditPostId
}) {
  const dispatch = useDispatch();

  function handleOptionsClick() {
    if (openOptionsPostId === post.id) setOpenOptionsPostId(null);
    else setOpenOptionsPostId(post.id);
  }

  function DeletePost() {
    dispatch(deletePost(post.id));
  }

  return (
    <div>
      <div className={styles["edit-options-btn"]} onClick={handleOptionsClick}>
        ...
      </div>
      {openOptionsPostId === post.id && (
        <div className={styles["options-container"]}>
          <div
            className={styles["option"]}
            onClick={() => setEditPostId(post.id)}
          >
            🖊️ Edit Post
          </div>
          <div className={styles["option"]} onClick={() => DeletePost()}>
            🗑️ Delete Post
          </div>
        </div>
      )}
    </div>
  );
}
