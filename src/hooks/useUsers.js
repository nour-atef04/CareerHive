import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchFollowings,
  fetchFollowers,
  fetchUser,
  fetchUsers,
  followUser,
  unfollowUser,
} from "../services/apiUsers";
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
    queryKey: ["users", userId, "followings"],
    queryFn: () => fetchFollowings(userId),
    enabled: !!userId,
  });
}

export function useUserFollowers(userId) {
  return useQuery({
    queryKey: ["users", userId, "followers"],
    queryFn: () => fetchFollowers(userId),
    enabled: !!userId,
  });
}

export function useFollowUser() {
  const queryClient = useQueryClient();
  const { currentUser, setCurrentUser } = useAuth();

  return useMutation({
    mutationFn: (userIdToFollow) => followUser(currentUser.id, userIdToFollow),
    onSuccess: (updatedUser) => {
      // update auth context
      setCurrentUser(updatedUser);

      // update cached current user
      queryClient.setQueryData(["users", updatedUser.id], updatedUser);

      // refetch followings list
      queryClient.invalidateQueries({
        queryKey: ["users", updatedUser.id, "followings"],
      });

      // refetch users list
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();
  const { currentUser, setCurrentUser } = useAuth();

  return useMutation({
    mutationFn: (userIdToUnfollow) =>
      unfollowUser(currentUser.id, userIdToUnfollow),
    onSuccess: (updatedUser) => {
      // update auth context
      setCurrentUser(updatedUser);

      // update cached current user
      queryClient.setQueryData(["users", updatedUser.id], updatedUser);

      // refetch followings list
      queryClient.invalidateQueries({
        queryKey: ["users", updatedUser.id, "followings"],
      });

      // refetch users list
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
