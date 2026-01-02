import supabase from "./supabase";

export async function fetchUsers() {
  let { data: profiles, error } = await supabase.from("profiles").select("*");
  if (error) throw new Error("Failed to fetch users.");
  return profiles;
}

export async function signIn(email, password) {
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Failed to sign in.");
  return user.user;
}

export async function fetchUser(userId) {
  let { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error("Failed to fetch user.");
  return profile;
}

export async function fetchFollowings(userId) {
  let { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("followerId", userId);
  if (error) throw new Error("Failed to fetch user followings.");

  const followingIds = data.map((row) => row.followingId);
  return followingIds;
}

export async function fetchFollowers(userId) {
  let { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("followingId", userId);
  if (error) throw new Error("Failed to fetch user followers.");

  const followerIds = data.map((row) => row.followerId);
  return followerIds;
}

export async function followUser(currentUserId, userIdToFollow) {
  const { error } = await supabase.from("follows").insert([
    {
      followerId: currentUserId,
      followingId: userIdToFollow,
    },
  ]);

  if (error) throw new Error("Failed to follow user.");
}

export async function unfollowUser(currentUserId, userIdToUnfollow) {
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("followerId", currentUserId)
    .eq("followingId", userIdToUnfollow);
  if (error) throw new Error("Failed to unfollow user.");
}
