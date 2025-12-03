// TODO: REFACTOR

import { forwardRef } from "react";
import AddCommentInput from "./AddCommentInput";
import Comment from "./Comment";
import { usePost } from "../../../context/PostContext";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../../redux/slices/authSlice";

const PostCommentSection = forwardRef(function PostCommentSection(
  { postId, commentedPostfilter },
  ref
) {
  const postUi = useSelector((state) => state.postUi[postId]);
  const { userId: profileUserParam } = useParams();
  const loggedInUser = useSelector(getUser);

  const profileUserId =
    profileUserParam === "me" ? loggedInUser.id : Number(profileUserParam);

  // if not intialized yet
  if (!postUi) return null;

  // Sort so that PROFILE USER'S comments appear first
  const sortedComments = [...postUi.comments].sort((a, b) => {
    const aIsProfileUser = a.authorId === profileUserId;
    const bIsProfileUser = b.authorId === profileUserId;

    if (aIsProfileUser && !bIsProfileUser) return -1;
    if (!aIsProfileUser && bIsProfileUser) return 1;

    return 0;
  });

  return (
    <>
      <AddCommentInput ref={ref} postId={postId} />
      {sortedComments.map((comment) => (
        <Comment key={comment.id} comment={comment} postId={postId} />
      ))}
    </>
  );
});

export default PostCommentSection;
