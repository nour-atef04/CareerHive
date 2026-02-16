import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../hooks/usePosts";
import styles from "./PostDetails.module.css";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import Post from "../components/Post/Post";
import { useState } from "react";

export default function PostDetails() {
  const { postId } = useParams();
  const { data: post = {}, isLoading, error } = usePost(postId);
  const navigate = useNavigate();

  const [openOptionsPostId, setOpenOptionsPostId] = useState(null);

  if (isLoading) return <Loader />;
  if (error || !post)
    return (
      <div className={styles.error}>
        <p>Post not found</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Button onClick={() => navigate(-1)} aria-label="Go back to feed">
            ← Back
          </Button>
          <h2>Post</h2>
        </header>
        <article>
          <Post
            post={post}
            mode="details" // tells Post to auto-open comments
            openOptionsPostId={openOptionsPostId}
            setOpenOptionsPostId={setOpenOptionsPostId}
            profileUserId={null}
          />
        </article>
      </div>
    </main>
  );
}
