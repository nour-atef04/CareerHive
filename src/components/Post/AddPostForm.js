import { useState } from "react";
import styles from "./AddPostForm.module.css";
import ProfileIcon from "../ProfileIcon";
import FormInput from "../FormInput";
import DeleteButton from "../DeleteButton";
import Button from "../Button";
import importPhoto from "../../assets/import-photo.png";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/slices/authSlice";

export default function AddPostForm({
  setIsNewPostFormOpen,
  postText,
  setPostText,
  photo,
  setPhoto,
}) {
  const user = useSelector(getUser);
  const { image } = user;

  const [photoPreview, setPhotoPreview] = useState(null);

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file); // keep the file for backend
      setPhotoPreview(URL.createObjectURL(file)); // for UI
    }
  }

  function handleDeletePhoto() {
    setPhoto(null);
    setPhotoPreview(null);
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
      {photoPreview && (
        <div className={styles["photo-preview"]}>
          <DeleteButton
            className={styles["delete-button"]}
            onClick={handleDeletePhoto}
          />

          <img src={photoPreview} alt="post media" />
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
          variant={postText === "" && !postText.trim() ? "disabled" : "filled"}
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
