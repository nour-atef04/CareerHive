import { useAuth } from "../../context/AuthContext";
import ProfileIcon from "../ProfileIcon";
import styles from "./AddPost.module.css";
import { useState } from "react";
import AddPostForm from "./AddPostForm";
import { usePosts } from "../../context/PostsContext";

export default function AddPost() {
  const { user } = useAuth();
  const { image } = user;
  const [IsNewPostFormOpen, setIsNewPostFormOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [photo, setPhoto] = useState(null);
  const { addPost } = usePosts();

  function handleSubmit(e) {
    e.preventDefault();

    if (!postText.trim() && !photo) return;

    addPost(postText, photo ? URL.createObjectURL(photo) : null);

    setPostText("");
    setPhoto(null);
    setIsNewPostFormOpen(false);
  }

  return (
    <form className={styles["add-post-container"]} onSubmit={handleSubmit}>
      {IsNewPostFormOpen ? (
        <AddPostForm
          setIsNewPostFormOpen={setIsNewPostFormOpen}
          photo={photo}
          setPhoto={setPhoto}
          postText={postText}
          setPostText={setPostText}
        />
      ) : (
        <div className={styles["add-post"]}>
          <ProfileIcon
            src={`/assets/${image}.jpg`}
            alt="user profile"
            size="medium"
          />
          <div
            onClick={() => setIsNewPostFormOpen(true)}
            className={styles["create-new-post"]}
          >
            Create New Post
          </div>
        </div>
      )}
    </form>
  );
}
