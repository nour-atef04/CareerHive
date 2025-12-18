import ProfileIcon from "../../ui/ProfileIcon";
import styles from "./AddPost.module.css";
import { useState } from "react";
import AddPostForm from "./AddPostForm";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/authSlice";
import Panel from "../../ui/Panel";
import { useCreatePost } from "../../../hooks/useCreatePost";

export default function AddPost() {
  const user = useSelector(getUser);
  const { image } = user;
  const [IsNewPostFormOpen, setIsNewPostFormOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [photo, setPhoto] = useState(null);

  // --------- REFACTORED TO USE REACT QUERY INSTEAD ---------

  // const dispatch = useDispatch();

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   if (!postText.trim() && !photo) return;

  //   const photoBase64 = photo ? URL.createObjectURL(photo) : null;
  //   dispatch(addNewPost({ text: postText, photoBase64, user }));

  //   setPostText("");
  //   setPhoto(null);
  //   setIsNewPostFormOpen(false);
  // }

  const { mutate: createPost, isLoading } = useCreatePost();

  function handleSubmit({ text, photo }) {
    if (!text.trim() && !photo) return;

    const newPost = {
      id: Date.now().toString(), // generate unique id
      authorId: user.id.toString(),
      authorName: user.name,
      authorImage: user.image,
      authorPosition: user.position || "",
      text,
      photo: photo ? URL.createObjectURL(photo) : null,
      date: new Date().toISOString(),
      likes: 0,
      liked: false,
      comments: [],
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
          isSubmitting={isLoading}
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
    </Panel>
  );
}
