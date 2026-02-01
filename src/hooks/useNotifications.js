import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../services-with-supabase/apiNotifications";

export function useNotifications(userId) {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => fetchNotifications(userId),
    enabled: !!userId,
  });
}
