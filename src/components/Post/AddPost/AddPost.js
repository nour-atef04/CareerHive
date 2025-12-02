import ProfileIcon from "../../ui/ProfileIcon";
import styles from "./AddPost.module.css";
import { useState } from "react";
import AddPostForm from "./AddPostForm";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/authSlice";
import { addNewPost } from "../../../redux/slices/postsSlice";

export default function AddPost() {
  const user = useSelector(getUser);
  const { image } = user;
  const [IsNewPostFormOpen, setIsNewPostFormOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (!postText.trim() && !photo) return;

    const photoBase64 = photo ? URL.createObjectURL(photo) : null;
    dispatch(addNewPost({ text: postText, photoBase64, user }));

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
