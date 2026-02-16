import { useEffect, useState } from "react";
import PostInput from "./PostInput";
import PhotoPreview from "./PhotoPreview";
import PostFormActions from "./PostFormActions";
import { useAuth } from "../../../context/AuthContext";

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
  const { currentUser } = useAuth();

  function handlePhoto(file) {
    setPhoto(file);
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ authorId: currentUser.id, text: postText, photo });
    // setPhotoPreview(null);
  }

  // ensure when AddPost clears the photo on success,
  // the preview clears automatically
  useEffect(() => {
    if (!photo) setPhotoPreview(null);
  }, [photo]);

  function handleRemovePhoto() {
    setPhoto(null);
    setPhotoPreview(null);
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Create a post">
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
