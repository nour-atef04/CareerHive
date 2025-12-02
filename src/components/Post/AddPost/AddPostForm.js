import { useState } from "react";
import PostInput from "./PostInput";
import PhotoPreview from "./PhotoPreview";
import PostFormActions from "./PostFormActions";

export default function AddPostForm({
  setIsNewPostFormOpen,
  postText,
  setPostText,
  photo,
  setPhoto,
}) {
  const [photoPreview, setPhotoPreview] = useState(null);

  return (
    <>
      <PostInput setPostText={setPostText} postText={postText} />
      {photoPreview && (
        <PhotoPreview
          setPhoto={setPhoto}
          photoPreview={photoPreview}
          setPhotoPreview={setPhotoPreview}
        />
      )}
      <PostFormActions
        setPhoto={setPhoto}
        setPhotoPreview={setPhotoPreview}
        setIsNewPostFormOpen={setIsNewPostFormOpen}
        postText={postText}
      />
    </>
  );
}
