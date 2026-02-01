import { forwardRef, useMemo } from "react";
import AddCommentInput from "./AddCommentInput";
import Comment from "./Comment";

const PostCommentSection = forwardRef(function PostCommentSection(
  { comments, postId, highlightUserId, postAuthorId },
  ref
) {

// of a highlightUserId is provided (Activity Tab),
  // put their comments at the top.
  const sortedComments = useMemo(() => {
    if (!highlightUserId) return comments;
    
    return [...comments].sort((a, b) => {
      const aIsUser = a.authorId === highlightUserId;
      const bIsUser = b.authorId === highlightUserId;
      if (aIsUser && !bIsUser) return -1;
      if (!aIsUser && bIsUser) return 1;
      return 0;
    });
  }, [comments, highlightUserId]);

  return (
    <>
      <AddCommentInput
        ref={ref}
        postId={postId}
        postAuthorId={postAuthorId}
      />
      {sortedComments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
});

export default PostCommentSection;
