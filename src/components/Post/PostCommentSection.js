import { forwardRef } from "react";
import AddCommentInput from "./AddCommentInput";
import Comment from "./Comment";
import { usePost } from "../../context/PostContext";

const PostCommentSection = forwardRef(function PostCommentSection(_, ref) {
  const { state } = usePost();
  const { comments } = state;

  return (
    <>
      <AddCommentInput ref={ref} />
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
});

export default PostCommentSection;
