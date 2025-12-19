import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFollowings, fetchUser, fetchUsers, updateUser } from "../services/apiUsers";
import { useAuth } from "../context/AuthContext";

// fetch lists
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}

// fetch one profile
export function useUser(userId) {
  const { currentUser } = useAuth();

  return useQuery({
    queryKey: ["users", userId],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey; // unpack userId from queryKey
      if (id === "me") return currentUser; // return current user directly
      return fetchUser(id);
    },
    enabled: !!userId,
  });
}

export function useUserFollowings(userId) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchFollowings(userId),
    enabled: !!userId,
  });
}

export function useFollowUser() {
  const queryClient = useQueryClient();
  const { currentUser, setCurrentUser } = useAuth();

  return useMutation({
    mutationFn: (userIdToFollow) => {
      const newFollowings = [
        ...(currentUser.followingIds || []),
        userIdToFollow,
      ];
      return updateUser({ ...currentUser, followingIds: newFollowings });
    },
    onSuccess: (updatedUser) => {
      // update query cache (optimistic update)
      queryClient.setQueryData(["users"], (oldUsers) =>
        oldUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      queryClient.setQueryData(["users", updatedUser.id], updatedUser);
      setCurrentUser(updatedUser);
    },
  });
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();
  const { currentUser, setCurrentUser } = useAuth();

  return useMutation({
    mutationFn: (userIdToUnfollow) => {
      const newFollowings = (currentUser.followingIds || []).filter(
        (id) => id !== userIdToUnfollow
      );
      return updateUser({ ...currentUser, followingIds: newFollowings });
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (oldUsers) =>
        oldUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      queryClient.setQueryData(["users", updatedUser.id], updatedUser);
      setCurrentUser(updatedUser);
    },
  });
}
