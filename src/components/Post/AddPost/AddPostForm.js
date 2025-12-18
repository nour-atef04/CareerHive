import { useState } from "react";
import PostInput from "./PostInput";
import PhotoPreview from "./PhotoPreview";
import PostFormActions from "./PostFormActions";

export default function AddPostForm({
  postText,
  setPostText,
  photo,
  setPhoto,
  onSubmit,
  setIsNewPostFormOpen,
  isSubmitting,
}) {
  const [photoPreview, setPhotoPreview] = useState(null);

  function handlePhoto(file) {
    setPhoto(file);
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ text: postText, photo });
    setPhotoPreview(null);
  }

  function handleRemovePhoto() {
    setPhoto(null);
    setPhotoPreview(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <PostInput postText={postText} setPostText={setPostText} />
      {photoPreview && (
        <PhotoPreview
          photoPreview={photoPreview}
          onRemove={handleRemovePhoto}
        />
      )}
      <PostFormActions
        postText={postText}
        setPhoto={setPhoto}
        setPhotoPreview={setPhotoPreview}
        setIsNewPostFormOpen={setIsNewPostFormOpen}
        onPhotoSelect={handlePhoto}
        isSubmitting={isSubmitting}
        photo={photo}
      />
    </form>
  );
}
