import { SupabaseClient } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";

export async function fetchPosts({ followingIds, profileId, currentUserId }) {
  let query = supabase.from("posts").select(
    `
      *,
      author:profiles!authorId(*),
      post_comments(*),
      post_likes(userId)
    `,
  );

  if (profileId) {
    // specific profile posts -> ignore followingIds + get posts commented on
    // 1st find ids of posts where user commented
    const { data: commentedData, error: commentError } = await supabase
      .from("post_comments")
      .select("postId")
      .eq("authorId", profileId);

    if (commentError) throw new Error("Failed to fetch user activity.");

    // extract ids and remove duplicates
    const commentedPostIds = [...new Set(commentedData.map((c) => c.postId))];

    // 2nd construct the OR query (is author OR is in commented list)
    if (commentedPostIds.length > 0) {
      query = query.or(
        `authorId.eq.${profileId},id.in.(${commentedPostIds.join(",")})`,
      );
    } else {
      // if they haven't commented on anything, just show their own posts
      query = query.eq("authorId", profileId);
    }
  } else if (followingIds?.length > 0) {
    // if on home feed -> get posts from followings
    query = query.in("authorId", followingIds);
  } else {
    return [];
  }

  const { data: posts, error } = await query;
  if (error) {
    console.error(error);

    throw new Error("Failed to fetch posts.");
  }

  // console.log(posts);

  return posts.map((post) => ({
    ...post,
    postComments: post.post_comments || [],
    postLikes: post.post_likes || [],
    liked: (post.post_likes || []).some(
      (like) => like.userId === currentUserId, // check if cur user liked it
    ),
  }));
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
