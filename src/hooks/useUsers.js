import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchFollowings,
  fetchFollowers,
  fetchUser,
  fetchUsers,
  followUser,
  unfollowUser,
  getUserSuggestions,
  getUserRequests,
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
  return useQuery({
    queryKey: ["users", userId, "suggestions"],
    queryFn: () => getUserSuggestions(userId),
    enabled: !!userId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export function useUserRequests(userId) {
  return useQuery({
    queryKey: ["users", userId, "requests"],
    queryFn: () => getUserRequests(userId),
    enabled: !!userId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
