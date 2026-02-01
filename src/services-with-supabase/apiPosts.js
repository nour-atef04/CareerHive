import supabase, { supabaseUrl } from "./supabase";

export async function fetchPosts({
  followingIds,
  profileId,
  currentUserId,
  type = "feed", // "feed" | "posts" | "reposts" | "comments"
}) {
  let query = supabase.from("posts").select(
    `
      *,
      author:profiles!authorId(*),
      post_comments(*),
      post_likes(userId),
      post_reposts(userId)
    `,
  );

  switch (type) {
    case "posts":
      // posts the profile user has posted
      if (!profileId) throw new Error("Profile ID required for posts.");
      query = query.eq("authorId", profileId);
      break;
    case "reposts":
      // posts the profile user has reposted
      if (!profileId) throw new Error("Profile ID required for posts.");
      const repostedIds = await fetchRepostedIds(profileId);
      if (repostedIds.length === 0) return [];
      query = query.in("id", repostedIds);
      break;
    case "comments":
      // posts the profile user has commented on
      if (!profileId) throw new Error("Profile ID required for posts.");
      const commentedIds = await fetchCommentedPostIds(profileId);
      if (commentedIds.length === 0) return [];
      query = query.in("id", commentedIds);
      break;
    case "feed":
      // posts from followed users
      if (!followingIds || followingIds.length === 0) return [];
      query = query.in("authorId", followingIds);
      break;
    default:
      return [];
  }

  const { data: posts, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Failed to fetch posts.");
  }

  return posts.map((post) => ({
    ...post,
    postComments: post.post_comments || [],
    postLikes: post.post_likes || [],
    postReposts: post.post_reposts || [],
  }));
}

async function fetchRepostedIds(userId) {
  const { data } = await supabase
    .from("post_reposts")
    .select("postId")
    .eq("userId", userId);
  return data?.map((r) => r.postId) || [];
}

async function fetchCommentedPostIds(userId) {
  const { data } = await supabase
    .from("post_comments")
    .select("postId")
    .eq("authorId", userId);

  // unique IDs only
  return [...new Set(data?.map((c) => c.postId) || [])];
}

export async function fetchPost(postId) {
  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `*,
      author:profiles!authorId(*),
      post_comments(*),
      post_likes(userId),
      post_reposts(userId)
      `,
    )
    .eq("id", postId)
    .single();

  if (error) throw new Error("Post not found.");

  return {
    ...post,
    postComments: post.post_comments || [],
    postLikes: post.post_likes || [],
    postReposts: post.post_reposts || [],
  };
}

export async function createPost(newPost) {
  console.log("Photo Debug:", {
    value: newPost.photo,
    type: typeof newPost.photo,
    isFile: newPost.photo instanceof File,
    isBlob: newPost.photo instanceof Blob, // Check if it's a Blob instead
  });

  // check if there's an image to upload (file object)
  const hasImage = newPost.photo && newPost.photo instanceof File;
  let finalImageUrl = null;

  if (hasImage) {
    // generate unique name
    const fileName = `${Math.random()}-${newPost.photo.name}`.replaceAll(
      "/",
      "",
    );

    // upload to supabase storage
    const { error: storageError } = await supabase.storage
      .from("post-images")
      .upload(fileName, newPost.photo);

    if (storageError) {
      console.error(storageError);
      throw new Error(
        "Post image could not be uploaded: " + storageError.message,
      );
    }

    // construct the public URL
    finalImageUrl = `${supabaseUrl}/storage/v1/object/public/post-images/${fileName}`;
    console.log(finalImageUrl);
  }

  const postData = {
    text: newPost.text,
    authorId: newPost.authorId,
    photo: finalImageUrl,
  };

  console.log("Inserting Post:", {
    text: newPost.text,
    authorId: newPost.authorId, // Is this undefined?
    photo: finalImageUrl,
  });

  let { error } = await supabase.from("posts").insert([postData]);
  if (error) throw new Error("Failed to add post." + error.message);
}

export async function togglePostLike({ userId, postId, isLiked }) {
  if (isLiked) {
    const { error } = await supabase
      .from("post_likes")
      .delete()
      .eq("userId", userId)
      .eq("postId", postId);
    if (error) throw new Error("Failed to unlike post.");
  } else {
    const { error } = await supabase
      .from("post_likes")
      .insert([{ postId, userId }]);
    if (error) throw new Error("Failed to like post.");
  }
}

export async function updatePost({ postId, newText }) {
  const { error } = await supabase
    .from("posts")
    .update({ text: newText })
    .eq("id", postId);
  if (error) throw new Error("Failed to update post");
}

export async function deletePost(postId) {
  // fetch post 1st to get the image URL
  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("photo")
    .eq("id", postId)
    .single();

  if (fetchError) {
    console.error("Error fetching post before deletion:", fetchError);
  }

  // if there's an image -> delete it from storage
  if (post?.photo) {
    const fileName = post.photo.split("/").pop(); // just need the last part
    const { error: storageError } = await supabase.storage
      .from("post-images")
      .remove([fileName]);

    if (storageError) {
      console.error("Couldn't delete image from storage: " + storageError);
    }
  }

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

export async function toggleRepost({ userId, postId, isReposted }) {
  if (isReposted) {
    const { error } = await supabase
      .from("post_reposts")
      .delete()
      .eq("userId", userId)
      .eq("postId", postId);
    if (error) throw new Error("Failed to remove repost.");
  } else {
    const { error } = await supabase
      .from("post_reposts")
      .upsert([{ postId, userId }], {
        onConflict: "userId, postId",
        ignoreDuplicates: true,
      });
    if (error) throw new Error("Failed to repost.");
  }
}
