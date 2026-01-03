import { forwardRef } from "react";
import AddCommentInput from "./AddCommentInput";
import Comment from "./Comment";

const PostCommentSection = forwardRef(function PostCommentSection(
  { comments, postId, commentedPostfilter, user },
  ref
) {
  console.log(comments);

  // Sort PROFILE USER comments first if needed
  const sortedComments = [...comments].sort((a, b) => {
    if (!commentedPostfilter) return 0;
    const profileUserId = commentedPostfilter.userId;
    const aIsProfileUser = a.authorId === profileUserId;
    const bIsProfileUser = b.authorId === profileUserId;
    if (aIsProfileUser && !bIsProfileUser) return -1;
    if (!aIsProfileUser && bIsProfileUser) return 1;
    return 0;
  });

  return (
    <>
      <AddCommentInput
        ref={ref}
        postId={postId}
        user={user}
      />
      {sortedComments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
});

export default PostCommentSection;
