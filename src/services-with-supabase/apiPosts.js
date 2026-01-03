import supabase from "./supabase";

export async function fetchPosts(followingIds = [], currentUserId) {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      post_comments(*),
      post_likes(userId)
    `
    )
    .in("authorId", followingIds);

  if (error) {
    throw new Error("Failed to fetch posts.");
  }

  // console.log(posts);

  return posts.map((post) => {
    const postComments = post.post_comments || [];
    const postLikes = post.post_likes || [];

    return {
      ...post,
      postComments,
      postLikes,
      liked: postLikes.some((like) => like.user_id === currentUserId), // check if current user liked it
    };
  });
}

export async function createPost(newPost) {
  let { error } = await supabase.from("posts").insert([newPost]);
  if (error) throw new Error("Failed to add post.");
}

export async function updatePost({ userId, postId, newText, toggleLike }) {
  if (newText !== undefined) {
    const { error } = await supabase
      .from("posts")
      .update({ text: newText })
      .eq("id", postId)
      .select();

    if (error) throw new Error("Failed to update post");
  }

  if (toggleLike !== undefined) {
    const { data: isLiked, error: isLikedError } = await supabase
      .from("post_likes")
      .select("*")
      .eq("userId", userId)
      .eq("postId", postId);

    if (isLiked) {
      // delete like

      const { error: deleteLikeError } = await supabase
        .from("post_likes")
        .delete()
        .eq("userId", userId)
        .eq("postId", postId);

      if (deleteLikeError) throw new Error("Failed to like post.");
    } else {
      // insert like

      const { error: createLikeError } = await supabase
        .from("post_likes")
        .insert([
          {
            postId,
            userId,
          },
        ]);

      if (createLikeError) throw new Error("Failed to like post.");
    }

    if (isLikedError) throw new Error("Failed to like post.");
  }
}

export async function deletePost(postId) {
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) throw new Error("Failed to delete post.");
}

export async function createComment(newComment) {
  let { data, error } = await supabase
    .from("post_comments")
    .insert([newComment])
    .select()
    .single();

  if (error) throw new Error("Failed to create comment.");
  return data;
}

export async function deleteComment(commentId) {
  console.log("COMMENT");
  console.log(commentId);

  const { data, error } = await supabase
    .from("post_comments")
    .delete()
    .eq("id", commentId);

  console.log(data);

  if (error) throw new Error("Failed to delete comment.");
}
