import styles from "./AddPostForm.module.css";
import ProfileIcon from "../ProfileIcon";
import FormInput from "../FormInput";
import DeleteButton from "../DeleteButton";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import importPhoto from "../../assets/import-photo.png";

export default function AddPostForm({
  setIsNewPostFormOpen,
  postText,
  setPostText,
  photo,
  setPhoto,
}) {
  const { user } = useAuth();
  const { image } = user;

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    setPhoto(file);
  }

  return (
    <>
      <div className={styles["add-post"]}>
        <ProfileIcon
          src={`/assets/${image}.jpg`}
          alt="user profile"
          size="medium"
        />
        <FormInput
          onChange={(e) => setPostText(e.target.value)}
          value={postText}
          type="textarea"
          placeholder="What do you want to talk about?"
        />
      </div>
      {photo && (
        <div className={styles["photo-preview"]}>
          <DeleteButton
            className={styles["delete-button"]}
            onClick={() => setPhoto(null)}
          />

          <img src={URL.createObjectURL(photo)} alt="post media" />
        </div>
      )}
      <div className={styles["bottom-container"]}>
        <p onClick={() => setIsNewPostFormOpen(false)}>Hide</p>
        <label className={styles["photo-upload"]}>
          <img src={importPhoto} alt="import" />
          Add Photo
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
        </label>
        <Button
          className={styles["post-button"]}
          variant={(postText === "" && !postText.trim()) ? "disabled" : "filled"}
          type="submit"
          size="md"
          color="brand2"
        >
          Post
        </Button>
      </div>
    </>
  );
}
