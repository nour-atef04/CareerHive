// TODO: REFACTOR

import { forwardRef } from "react";
import AddCommentInput from "./AddCommentInput";
import Comment from "./Comment";
import { usePost } from "../../../context/PostContext";
import { useSelector } from "react-redux";

const PostCommentSection = forwardRef(function PostCommentSection(
  { postId },
  ref
) {
  const postUi = useSelector((state) => state.postUi[postId]);

  // if not intialized yet
  if (!postUi) return null;

  return (
    <>
      <AddCommentInput ref={ref} postId={postId} />
      {postUi.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} postId={postId} />
      ))}
    </>
  );
});

export default PostCommentSection;
