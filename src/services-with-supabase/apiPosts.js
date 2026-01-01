export async function fetchPosts(followingIds) {
      const res = await fetch("http://localhost:3001/posts");
      if (!res.ok) throw new Error("Failed to fetch posts.");
      const posts = await res.json();
      return posts.filter((post) => followingIds.includes(post.authorId));
}

// import supabase from "./supabase";

// export async function fetchPosts() {
//   const { data, error } = await supabase.from("posts").select("*");
//   if (error) throw error;
//   console.log(data);
//   return data;
// }

export async function createPost(newPost) {
  const res = await fetch("http://localhost:3001/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  if (!res.ok) throw new Error("Failed to create post.");
  return res.json();
}

export async function updatePost({
  postId,
  newText,
  toggleLike,
  currentLiked,
  currentLikes,
}) {
  const body = {};

  if (newText !== undefined) body.text = newText;
  if (toggleLike !== undefined) {
    body.liked = !currentLiked;
    body.likes = currentLikes + (currentLiked ? -1 : 1);
  }

  const res = await fetch(`http://localhost:3001/posts/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to update post.");
  return res.json();
}

export async function deletePost(postId) {
  const res = await fetch(`http://localhost:3001/posts/${postId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete post.");
  return res.json();
}

export async function createComment({ id, postId, text, authorId, author }) {
  const res = await fetch(`http://localhost:3001/posts/${postId}`);
  const post = await res.json();

  const updatedPost = {
    ...post,
    comments: [...post.comments, { id, text, authorId, author }],
  };

  await fetch(`http://localhost:3001/posts/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comments: updatedPost.comments }),
  });

  return updatedPost;
}

export async function deleteComment({ postId, commentId }) {
  const res = await fetch(`http://localhost:3001/posts/${postId}`);
  const post = await res.json();

  const updatedPost = {
    ...post,
    comments: post.comments.filter((c) => c.id !== commentId),
  };

  await fetch(`http://localhost:3001/posts/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comments: updatedPost.comments }),
  });

  return updatedPost;
}
