import Button from "../../ui/Button";
import styles from "./PostFormActions.module.css";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function PostFormActions({
  postText,
  onPhotoSelect,
  setPhoto,
  setPhotoPreview,
  photo,
  setIsNewPostFormOpen,
  isSubmitting,
}) {
  const isDisabled = !postText.trim() && !photo;

  function handlePhotoChange(e) {
    if (e.target.files && e.target.files[0]) {
      onPhotoSelect(e.target.files[0]);
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
        variant={isDisabled || isSubmitting ? "disabled" : "filled"}
        type="submit"
        size="md"
        color="brand2"
      >
        {isSubmitting ? "Posting..." : "Post"}
      </Button>
    </div>
  );
}
