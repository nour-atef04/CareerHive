import ProfileIcon from "../../ui/ProfileIcon";
import { useState } from "react";
import AddPostForm from "./AddPostForm";
import Panel from "../../ui/Panel";
import { useCreatePost } from "../../../hooks/usePosts";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./AddPost.module.css";

export default function AddPost() {
  // const user = useSelector(getUser);

  const navigate = useNavigate();
  const { currentUser: user } = useAuth();
  const { image } = user;
  const [IsNewPostFormOpen, setIsNewPostFormOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [photo, setPhoto] = useState(null);

  const { mutate: createPost, isPending } = useCreatePost();

  function handleSubmit({ text, photo }) {
    if (!text.trim() && !photo) return;

    const newPost = {
      authorId: user.id,
      text,
      photo: photo,
    };

    createPost(newPost, {
      onSuccess: () => {
        setIsNewPostFormOpen(false);
        setPostText("");
        setPhoto(null);
      },
    });
  }

  return (
    <Panel className={styles["add-post-container"]} topBorder={true}>
      {IsNewPostFormOpen ? (
        <AddPostForm
          postText={postText}
          setPostText={setPostText}
          photo={photo}
          setPhoto={setPhoto}
          onSubmit={handleSubmit}
          setIsNewPostFormOpen={setIsNewPostFormOpen}
          isSubmitting={isPending}
        />
      ) : (
        <div className={styles["add-post"]}>
          <ProfileIcon
            className={styles.image}
            onClick={() => navigate("/profile")}
            src={image}
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
    </Panel>
  );
}
