import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  fetchPosts,
  updatePost,
} from "../services/apiPosts";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
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
    },
  });
}
