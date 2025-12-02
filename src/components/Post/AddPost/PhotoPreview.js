import DeleteButton from "../../ui/DeleteButton";
import styles from "./PhotoPreview.module.css";

export default function PhotoPreview({
  setPhoto,
  setPhotoPreview,
  photoPreview,
}) {
  function handleDeletePhoto() {
    setPhoto(null);
    setPhotoPreview(null);
  }

  return (
    <div className={styles["photo-preview"]}>
      <DeleteButton
        className={styles["delete-button"]}
        onClick={handleDeletePhoto}
      />

      <img src={photoPreview} alt="post media" />
    </div>
  );
}
