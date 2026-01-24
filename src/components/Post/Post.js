// import styles from "./Post.module.css";
// import { useRef, useEffect, useState } from "react";
// import PostHeader from "./PostHeader";
// import PostContent from "./PostContent";
// import PostStatus from "./PostStatus";
// import PostInteractions from "./PostInteractions";
// import PostCommentSection from "./Comments/PostCommentSection";
// // import { useSelector } from "react-redux";

// import PostEditOptions from "./PostEditOptions";
// // import { getUser } from "../../redux/slices/authSlice";
// import PostEditModal from "./PostEditModal";
// import Panel from "../ui/Panel";
// import { useAuth } from "../../context/AuthContext";

// export default function Post({
//   post,
//   openOptionsPostId,
//   setOpenOptionsPostId,
//   commentedPostfilter,
// }) {
//   const postId = post.id;
//   const commentInputRef = useRef(null);
//   // const user = useSelector(getUser);
//   const { currentUser: user } = useAuth();

//   const [editPostId, setEditPostId] = useState(null);
//   const [likes, setLikes] = useState(post.postLikes.length);
//   const comments = post.postComments;
//   const [liked, setLiked] = useState(post.liked);
//   const [openComments, setOpenComments] = useState(!!commentedPostfilter);

//   // focus input when comments open
//   useEffect(() => {
//     if (openComments && commentInputRef.current && !commentedPostfilter) {
//       commentInputRef.current.focus();
//     }
//   }, [openComments, commentedPostfilter]);

//   return (
//     <Panel className={styles["post"]}>
//       <div className={styles["post-header"]}>
//         <PostHeader post={post} />
//         {post.authorId === user.id && (
//           <PostEditOptions
//             post={post}
//             openOptionsPostId={openOptionsPostId}
//             setOpenOptionsPostId={setOpenOptionsPostId}
//             setEditPostId={setEditPostId}
//           />
//         )}
//       </div>
//       <PostContent post={post} openOptionsPostId={openOptionsPostId} />
//       <PostStatus
//         likes={likes}
//         comments={comments}
//         toggleComments={() => setOpenComments((prev) => !prev)}
//       />
//       <PostInteractions
//         liked={liked}
//         likes={likes}
//         postId={postId}
//         setLiked={setLiked}
//         setLikes={setLikes}
//         toggleComments={() => setOpenComments((prev) => !prev)}
//       />
//       {openComments && (
//         <PostCommentSection
//           commentedPostfilter={commentedPostfilter}
//           ref={commentInputRef}
//           postId={postId}
//           comments={comments}
//           user={user}
//         />
//       )}
//       {editPostId === postId && (
//         <PostEditModal post={post} onClose={() => setEditPostId(null)} />
//       )}
//     </Panel>
//   );
// }

import styles from "./Post.module.css";
import { useRef, useEffect, useState } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostStatus from "./PostStatus";
import PostInteractions from "./PostInteractions";
import PostCommentSection from "./Comments/PostCommentSection";
import PostEditOptions from "./PostEditOptions";
import PostEditModal from "./PostEditModal";
import Panel from "../ui/Panel";
import { useAuth } from "../../context/AuthContext";
import { useToggleLike } from "../../hooks/usePosts";

export default function Post({
  post,
  mode,
  profileUserId,
  openOptionsPostId,
  setOpenOptionsPostId,
}) {
  const { currentUser } = useAuth();
  const commentInputRef = useRef(null);
  const [openComments, setOpenComments] = useState(mode === "comments");
  const [editPostId, setEditPostId] = useState(null);

  // Status indicators derived directly from props (no local state duplication)
  const likesCount = post.postLikes?.length || 0;
  const isLiked = post.liked;
  const comments = post.postComments || [];

  const { mutate: toggleLike } = useToggleLike();

  // focus input when manually opening comments
  useEffect(() => {
    if (openComments && commentInputRef.current && mode !== "comments") {
      commentInputRef.current.focus();
    }
  }, [openComments, mode]);

  function handleLike() {
    toggleLike({
      postId: post.id,
      userId: currentUser.id,
      isLiked,
    });
  }

  return (
    <Panel className={styles["post"]}>
      <div className={styles["post-header"]}>
        <PostHeader post={post} />
        {post.authorId === currentUser.id && (
          <PostEditOptions
            post={post}
            openOptionsPostId={openOptionsPostId}
            setOpenOptionsPostId={setOpenOptionsPostId}
            setEditPostId={setEditPostId}
          />
        )}
      </div>

      <PostContent post={post} openOptionsPostId={openOptionsPostId} />

      <PostStatus
        likes={likesCount}
        comments={comments}
        toggleComments={() => setOpenComments((prev) => !prev)}
      />
      <PostInteractions
        liked={isLiked}
        likes={likesCount}
        setLiked={handleLike}
        setLikes={() => {}}
        toggleComments={() => setOpenComments((prev) => !prev)}
      />
      {openComments && (
        <PostCommentSection
          ref={commentInputRef}
          postId={post.id}
          comments={comments}
          user={currentUser}
          // if in "comments" mode, pass the profile ID to highlight their comment
          highlightUserId={mode === "comments" ? profileUserId : null}
        />
      )}
      {editPostId === post.id && (
        <PostEditModal post={post} onClose={() => setEditPostId(null)} />
      )}
    </Panel>
  );
}
