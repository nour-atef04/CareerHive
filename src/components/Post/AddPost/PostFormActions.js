import Button from "../../ui/Button";
import styles from "./PostFormActions.module.css";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function PostFormActions({
  setPhoto,
  setPhotoPreview,
  setIsNewPostFormOpen,
  postText,
}) {
  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file); // keep the file for backend
      setPhotoPreview(URL.createObjectURL(file)); // for UI
    }
  }
  return (
    <div className={styles["bottom-container"]}>
      <p onClick={() => setIsNewPostFormOpen(false)}>Hide</p>
      <label className={styles["photo-upload"]}>
        <MdOutlineAddPhotoAlternate style={{ fontSize: "large" }} />
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
  );
}
