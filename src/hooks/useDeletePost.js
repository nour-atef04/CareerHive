import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../services/apiPosts";

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });
}
