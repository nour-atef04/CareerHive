import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  fetchPosts,
  updatePost,
} from "../services/apiPosts";
import toast from "react-hot-toast";

export function usePosts(followingIds) {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(followingIds),
    select: (posts) =>
      [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)),
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
      toast.success("Successfully edited your post!");
    },
    onError: (error) => {
      toast.error("Error editing your post: " + error.message);
    },
  });
}
