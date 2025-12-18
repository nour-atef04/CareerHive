import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../services/apiPosts";

export function useEditPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });
}
