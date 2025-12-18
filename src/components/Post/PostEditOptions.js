import styles from "./PostEditOptions.module.css";
import { useDeletePost } from "../../hooks/useDeletePost";

export default function PostEditOptions({
  post,
  openOptionsPostId,
  setOpenOptionsPostId,
  setEditPostId,
}) {
  const deleteMutation = useDeletePost();

  function handleOptionsClick() {
    if (openOptionsPostId === post.id) setOpenOptionsPostId(null);
    else setOpenOptionsPostId(post.id);
  }

  function DeletePost() {
    deleteMutation.mutate(post.id);
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
