import styles from "./CommentContent.module.css";

export default function CommentContent({ comment }) {
  return <p className={styles["comment-content"]}>{comment.text}</p>;
}
