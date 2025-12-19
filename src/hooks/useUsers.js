import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, updateUser } from "../services/apiUsers";
import { useAuth } from "../context/AuthContext";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}

export function useFollowUser() {
  const queryClient = useQueryClient();
  const { currentUser, setCurrentUser } = useAuth();

  return useMutation({
    mutationFn: (userIdToFollow) => {
      const newFollowings = [...(currentUser.following || []), userIdToFollow];
      return updateUser({ ...currentUser, following: newFollowings });
    },
    onSuccess: (updatedUser) => {
      // update query cache (optimistic update)
      queryClient.setQueryData(["users"], (oldUsers) =>
        oldUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      setCurrentUser(updatedUser);
    },
  });
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();
  const { currentUser, setCurrentUser } = useAuth();

  return useMutation({
    mutationFn: (userIdToUnfollow) => {
      const newFollowings = (currentUser.following || []).filter(
        (id) => id !== userIdToUnfollow
      );
      return updateUser({ ...currentUser, following: newFollowings });
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (oldUsers) =>
        oldUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      setCurrentUser(updatedUser);
    },
  });
}
