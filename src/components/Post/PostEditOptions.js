import styles from "./PostEditOptions.module.css";
import { useDeletePost } from "../../hooks/usePosts";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

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
            <FaPencil /> Edit Post
          </div>
          <div className={styles["option"]} onClick={() => DeletePost()}>
            <FaTrash /> Delete Post
          </div>
        </div>
      )}
    </div>
  );
}
