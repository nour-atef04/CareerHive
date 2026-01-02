import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  fetchPosts,
  updatePost,
} from "../services-with-supabase/apiPosts";
import toast from "react-hot-toast";

export function usePosts(followingIds, currentUserId) {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(followingIds, currentUserId),
    select: (posts) =>
      [...posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    enabled: !!followingIds && followingIds.length > 0,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Successfully added your post!");
    },
    onError: (error) => {
      toast.error("Error adding your post: " + error.message);
    },
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(["posts"], (oldPosts = []) =>
        oldPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(["posts"], (oldPosts = []) =>
        oldPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: (postId) => {
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["posts"], postId);
      toast.success("Successfully deleted your post!");
    },
    onError: (error) => {
      toast.error("Error deleting your post: " + error.message);
    },
  });
}

export function useEditPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (postId) => {
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["posts"], postId);
    }
  });
}
