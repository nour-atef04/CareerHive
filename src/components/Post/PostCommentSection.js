import { forwardRef } from "react";
import AddCommentInput from "./AddCommentInput";
import Comment from "./Comment";

const PostCommentSection = forwardRef(function PostCommentSection(_, ref) {
  return (
    <>
      <AddCommentInput ref={ref} />
      <Comment>Proud of you!</Comment>
      <Comment>Congratulations!🎉</Comment>
    </>
  );
});

export default PostCommentSection;
