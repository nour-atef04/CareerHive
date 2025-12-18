import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../services/apiPosts";

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });
}
