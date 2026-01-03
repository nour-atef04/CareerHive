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
    .select(
      `
      followingId, 
      profiles!follows_following_id_fkey(
      id, name, image, position)`
    )
    .eq("followerId", userId);
  if (error) throw new Error("Failed to fetch user followings.");

  const followings = data.map((row) => row.profiles);
  // console.log(followings);
  return followings;
}

export async function fetchFollowers(userId) {
  let { data, error } = await supabase
    .from("follows")
    .select(
      `
      followerId, 
      profiles!follows_follower_id_fkey(
      id, name, image, position)`
    )
    .eq("followingId", userId);
  if (error) throw new Error("Failed to fetch user followers.");

  const followings = data.map((row) => row.profiles);
  return followings;
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

export async function getUserSuggestions(userId) {
  // get ids of user that the current user follow
  const { data: userFollowings, error: followingsError } = await supabase
    .from("follows")
    .select("followingId")
    .eq("followerId", userId);

  if (followingsError) throw followingsError;

  const followingIds = userFollowings.map((f) => f.followingId);

  // if user follows no one, there can't be any mutuals
  if (followingIds.length === 0) return [];

  // find followings of my followings
  const { data, error } = await supabase
    .from("follows")
    .select(
      `followingId, profiles!follows_following_id_fkey(id, name, image, position)`
    )
    .in("followerId", followingIds)
    // exclude user i already follow
    .not("followingId", "in", `(${followingIds.join(",")})`)
    // and exclude myself
    .neq("followingId", userId);

  if (error) throw error;
  // console.log(data);

  // compute mutual follow score (how many of my followings follow each candidate)
  const scoreMap = new Map();
  data.forEach(({ profiles }) => {
    if (!profiles) return;

    const id = profiles.id;
    if (!scoreMap.has(id)) {
      scoreMap.set(id, { ...profiles, score: 0 });
    }
    scoreMap.get(id).score += 1;
  });

  const allUsers = Array.from(scoreMap.values());

  // sort by score descending
  allUsers.sort((a, b) => b.score - a.score);

  // find max score
  const maxScore = allUsers[0].score;

  // include all users that have the max score
  const topUsers = allUsers.filter((u) => u.score === maxScore);

  // exactly 5 users
  return topUsers.length > 5 ? topUsers.slice(0, 5) : topUsers;
}

export async function getUserRequests(userId) {
  // get ids of user that the current user follow
  const { data: userFollowings, error: followingsError } = await supabase
    .from("follows")
    .select("followingId")
    .eq("followerId", userId);

  if (followingsError) throw followingsError;

  const followingIds = userFollowings.map((f) => f.followingId);

  let query = supabase
    .from("follows")
    .select(
      `
      followerId,
      profiles!follows_follower_id_fkey(id, name, image, position)
    `
    )
    .eq("followingId", userId); // only users who follow me

  // only exclude mutuals if there are followings
  if (followingIds.length > 0) {
    const excludeIds = `(${followingIds.map((id) => `"${id}"`).join(",")})`;
    query = query.not("followerId", "in", excludeIds);
  }

  const { data, error } = await query;

  console.log(data);

  if (error) throw error;
  return data.map((row) => row.profiles);
}
