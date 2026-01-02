import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchFollowings,
  fetchFollowers,
  fetchUser,
  fetchUsers,
  followUser,
  unfollowUser,
} from "../services-with-supabase/apiUsers";
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
      if (id === "me") {
        // console.log("ME");
        return currentUser;
      } // return current user directly
      // return fetchUser(id);
      const profile = await fetchUser(id);
      // console.log(profile);
      return profile;
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
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: ({ userIdToFollow }) =>
      followUser(currentUser.id, userIdToFollow),
    onSuccess: (_, { userName }) => {
      // refetch followings list
      queryClient.invalidateQueries({
        queryKey: ["users", currentUser.id, "followings"],
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
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: ({ userIdToUnfollow }) =>
      unfollowUser(currentUser.id, userIdToUnfollow),
    onSuccess: (_, { userName }) => {
      // refetch followings list
      queryClient.invalidateQueries({
        queryKey: ["users", currentUser.id, "followings"],
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
  const { data: followingIds, isLoading: isFollowingsLoading } =
    useUserFollowings(userId);

  return useQuery({
    queryKey: ["users", userId, "suggestions"],
    queryFn: async () => {
      // fetch all users
      const allUsers = await fetchUsers();

      // filter out current user and already-followed uses
      const candidates = allUsers.filter(
        (user) => user.id !== userId && !followingIds.includes(user.id)
      );

      // fetch followers for all candidates in parallel
      const followersMap = await Promise.all(
        candidates.map(async (user) => {
          const followerIds = await fetchFollowers(user.id);
          return { user, followerIds };
        })
      );

      // compute mutuals and sort
      const suggestions = followersMap
        .map(({ user, followerIds }) => {
          const mutuals = followerIds.filter((id) =>
            followingIds.includes(id)
          ).length;
          return { ...user, score: mutuals };
        })

        // sort based on the top 5 suggestions
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      return suggestions;
    },
    enabled: !!userId && !isFollowingsLoading,
    refetchOnWindowFocus: false, // don't refetch when user switches tabs
    refetchOnMount: false, // don't refetch when component mounts
    staleTime: Infinity, // keep data fresh forever (but i'll manually refetch when user navigates back to the page)
  });
}
