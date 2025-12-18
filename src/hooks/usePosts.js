import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../services/apiPosts";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    select: (posts) =>
      [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)),
  });
}
