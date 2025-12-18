import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../services/apiPosts";

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
}
