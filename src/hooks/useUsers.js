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
import toast from "react-hot-toast";

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
    mutationFn: ({ userIdToFollow }) =>
      followUser(currentUser.id, userIdToFollow),
    onSuccess: (updatedUser, { userName }) => {
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

      // display notification
      toast.success(`You are now following ${userName}`);
    },
    onError: (error, { userName }) => {
      toast.error(`Error following ${userName}: ${error.message}`);
    },
  });
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();
  const { currentUser, setCurrentUser } = useAuth();

  return useMutation({
    mutationFn: ({ userIdToUnfollow }) =>
      unfollowUser(currentUser.id, userIdToUnfollow),
    onSuccess: (updatedUser, { userName }) => {
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

      // display notification
      toast.success(`You have unfollowed ${userName}`);
    },
    onError: (error, { userName }) => {
      toast.error(`Error unfollowing ${userName}: ${error.message}`);
    },
  });
}

export function useUserSuggestions(userId) {
  const { currentUser } = useAuth();

  return useQuery({
    queryKey: ["users", userId, "suggestions"],
    queryFn: async () => {
      // fetch all users
      const allUsers = await fetchUsers();

      // fetch all followings of current user
      const followingIds = currentUser.followingIds || [];

      const suggestions = allUsers
        // filter so that suggestions don't include current user or followings
        .filter(
          (user) =>
            user.id !== currentUser.id && !followingIds.includes(user.id)
        )

        // mutuals = some of the followerIds of the suggested user are in current user's followingIds
        .map((user) => {
          const mutuals = (user.followerIds || []).filter((id) =>
            followingIds.includes(id)
          ).length;
          return { ...user, score: mutuals };
        })

        // sort based on the top 5 suggestions
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      return suggestions;
    },
    enabled: !!userId && !!currentUser,
    refetchOnWindowFocus: false, // don't refetch when user switches tabs
    refetchOnMount: false, // don't refetch when component mounts
    staleTime: Infinity, // keep data fresh forever (but i'll manually refetch when user navigates back to the page)
  });
}
