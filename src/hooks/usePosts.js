import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  fetchPost,
  fetchPosts,
  togglePostLike,
  toggleRepost,
  updatePost,
} from "../services-with-supabase/apiPosts";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { createNotification } from "../services-with-supabase/apiNotifications";

const postKeys = {
  all: ["posts"],
  feed: (ids) => [...postKeys.all, "feed", { ids }],
  profile: (id, type) => [...postKeys.all, "profile", { id, type }],
};

export function usePosts(followingIds, profileId, mode = "feed") {
  const { currentUser } = useAuth();

  return useQuery({
    queryKey: profileId
      ? postKeys.profile(profileId, mode)
      : postKeys.feed(followingIds),
    queryFn: () =>
      fetchPosts({
        followingIds,
        profileId,
        currentUserId: currentUser?.id,
        type: mode,
      }),
    select: (posts) =>
      [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    enabled: !!profileId || (!!followingIds && followingIds.length > 0),
  });
}

export function usePost(postId) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
    enabled: !!postId,
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

export function useToggleLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, userId, isLiked, postAuthorId }) => {
      await togglePostLike({ postId, userId, isLiked });
      // if liking, send a notif
      if (!isLiked && postAuthorId) {
        await createNotification({
          recipientId: postAuthorId,
          senderId: userId,
          type: "like",
          postId,
        });
      }
    },
    onError: () => {
      toast.error("Failed to like.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, userId, postAuthorId, comment }) => {
      await createComment(comment);
      if (postAuthorId) {
        await createNotification({
          recipientId: postAuthorId,
          senderId: userId,
          type: "comment",
          postId,
        });
      }
    },
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
            : post,
        ),
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
        })),
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

export function useToggleRepost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, userId, isReposted, postAuthorId }) => {
      await toggleRepost({ userId, postId, isReposted });
      if (!isReposted && postAuthorId) {
        await createNotification({
          recipientId: postAuthorId,
          senderId: userId,
          type: "repost",
          postId,
        });
      }
    },
    onSuccess: (_, { isReposted }) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success(isReposted ? "Repost removed" : "Reposted successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}
