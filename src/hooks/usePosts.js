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
      [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
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
    // when mutate is called:
    onMutate: async (newCommentVariables) => {
      // cancel outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // snapshot the previous value
      const previousPosts = queryClient.getQueryData(["posts"]);

      // optimistically update to the new value
      queryClient.setQueryData(["posts"], (oldPosts = []) =>
        oldPosts.map((post) =>
          post.id === newCommentVariables.postId
            ? {
                ...post,
                postComments: [
                  ...post.postComments,
                  {
                    ...newCommentVariables,
                    id: Date.now().toString(), // temp id since real one doesn't exist yet
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : post
        )
      );

      // return context object with the snapshotted value
      return { previousPosts };
    },
    // if the mutation fails, use the context we returned above
    onError: (err, newComment, context) => {
      queryClient.setQueryData(["posts"], context.previousPosts);
      toast.error("Could not add comment");
    },
    // always refetch after error or success to sync with DB IDs
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData(["posts"]);

      // update cache immediately
      queryClient.setQueryData(["posts"], (oldPosts = []) =>
        oldPosts.map((post) => ({
          ...post,
          postComments: post.postComments.filter((c) => c.id !== commentId),
        }))
      );

      return { previousPosts };
    },
    onError: (err, commentId, context) => {
      // rollback if delete fails
      queryClient.setQueryData(["posts"], context.previousPosts);
      toast.error("Failed to delete comment");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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
    },
  });
}
