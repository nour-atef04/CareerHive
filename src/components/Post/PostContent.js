import styles from "./PostContent.module.css";

export default function PostContent({ post }) {
  const { text, photo } = post;

  return (
    <>
      <div className={styles["content"]}>
        <p>{text}</p>
      </div>
      {photo && <img src={photo} alt="post media" />}
    </>
  );
}
