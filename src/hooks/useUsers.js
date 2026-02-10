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
  fetchUsersByName,
  editProfile,
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

export function useUsersByName(name) {
  return useQuery({
    queryKey: ["users", name],
    queryFn: () => fetchUsersByName(name),
    enabled: !!name,
  });
}

export function useUser(userId) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });
}

// DONE
export function useUserFollowings(userId) {
  return useQuery({
    queryKey: ["users", userId, "followings"],
    queryFn: () => fetchFollowings(userId),
    enabled: !!userId,
  });
}

// DONE
export function useUserFollowers(userId) {
  return useQuery({
    queryKey: ["users", userId, "followers"],
    queryFn: () => fetchFollowers(userId),
    enabled: !!userId,
  });
}


// DONE
export function useFollowUser() {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: ({ userIdToFollow }) =>
      followUser(currentUser.id, userIdToFollow),
    onSuccess: (_, { userName, userIdToFollow }) => {
      // refetch users
      // queryClient.invalidateQueries({
      //   queryKey: ["users"],
      // });

      // refetch my followings list
      queryClient.invalidateQueries({
        queryKey: ["users", currentUser.id, "followings"],
      });

      // refetch user's profile to update followers
      queryClient.invalidateQueries({
        queryKey: ["users", userIdToFollow],
      });

      // refetch suggestions list
      queryClient.invalidateQueries({
        queryKey: ["users", currentUser.id, "suggestions"],
      });

      // display notification
      toast.success(`You are now following ${userName}`);
    },
    onError: (error, { userName }) => {
      toast.error(`Error following ${userName}: ${error.message}`);
    },
  });
}


// DONE
export function useUnfollowUser() {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: ({ userIdToUnfollow }) =>
      unfollowUser(currentUser.id, userIdToUnfollow),
    onSuccess: (_, { userName, userIdToUnfollow }) => {
      // refetch users
      // queryClient.invalidateQueries({
      //   queryKey: ["users"],
      // });

      // refetch followings list
      queryClient.invalidateQueries({
        queryKey: ["users", currentUser.id, "followings"],
      });

      // refetch suggestions list
      queryClient.invalidateQueries({
        queryKey: ["users", currentUser.id, "suggestions"],
      });

      // refetch user's profile to update followings
      queryClient.invalidateQueries({
        queryKey: ["users", userIdToUnfollow],
      });

      // display notification
      toast.success(`You have unfollowed ${userName}`);
    },
    onError: (error, { userName }) => {
      toast.error(`Error unfollowing ${userName}: ${error.message}`);
    },
  });
}


// DONE
export function useUserSuggestions(userId) {
  return useQuery({
    queryKey: ["users", userId, "suggestions"],
    queryFn: () => getUserSuggestions(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    // staleTime: Infinity,
    // refetchOnWindowFocus: false,
    // refetchOnMount: true,
  });
}

export function useUserRequests(userId) {
  return useQuery({
    queryKey: ["users", userId, "requests"],
    queryFn: () => getUserRequests(userId),
    enabled: !!userId,
    // staleTime: Infinity,
    // refetchOnWindowFocus: false,
    // refetchOnMount: true,
  });
}

export function useEditProfile() {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const userId = currentUser.id;

  return useMutation({
    mutationFn: (data) => editProfile({ userId, data }),
    onSuccess: () => {
      toast.success("Profile succesfully updated.");
      queryClient.invalidateQueries({
        queryKey: ["users", userId],
      });
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  });
}
