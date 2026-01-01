const USERS_API = "http://localhost:3001/users";

export async function fetchUsers() {
  const res = await fetch(USERS_API);
  if (!res.ok) throw new Error("Failed to fetch users.");
  return res.json();
}

export async function fetchUser(userId) {
  const res = await fetch(`${USERS_API}/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function fetchFollowings(userId) {
  const resUser = await fetch(`${USERS_API}/${userId}`);
  if (!resUser.ok) throw new Error("Failed to fetch user");
  const user = await resUser.json();

  // fetch all users and filter by followingIds
  // TO DO: backend provides /users/:id/followings
  const resAll = await fetch(USERS_API);
  if (!resAll.ok) throw new Error("Failed to fetch users");
  const allUsers = await resAll.json();

  // console.log(allUsers);

  const followings = allUsers.filter((u) =>
    (user.followingIds || []).includes(u.id)
  );
  return followings;
}

export async function fetchFollowers(userId) {
  const resUser = await fetch(`${USERS_API}/${userId}`);
  if (!resUser.ok) throw new Error("Failed to fetch user");
  const user = await resUser.json();

  // fetch all users and filter by followerIds
  // TO DO: backend provides /users/:id/followers
  const resAll = await fetch(USERS_API);
  if (!resAll.ok) throw new Error("Failed to fetch users");
  const allUsers = await resAll.json();

  // console.log(allUsers);

  const followers = allUsers.filter((u) =>
    (user.followerIds || []).includes(u.id)
  );
  return followers;
}

export async function followUser(currentUserId, userIdToFollow) {
  // fetch current user
  const resUser = await fetch(`${USERS_API}/${currentUserId}`);
  if (!resUser.ok) throw new Error("Failed to fetch current user.");
  const user = await resUser.json();

  // update followingIds
  const updatedUser = {
    ...user,
    followingIds: [...(user.followingIds || []), userIdToFollow],
  };

  const resUpdate = await fetch(`${USERS_API}/${currentUserId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });

  if (!resUpdate.ok) throw new Error("Failed to follow user.");

  // fetch user to follow
  const resUserToFollow = await fetch(`${USERS_API}/${userIdToFollow}`);
  if (!resUserToFollow.ok) throw new Error("Failed to fetch user to follow.");
  const userToFollow = await resUserToFollow.json();

  // update followerIds
  const updatedUserToFollow = {
    ...userToFollow,
    followerIds: [...(userToFollow.followerIds || []), currentUserId],
  };

  const resUpdateUserToFollow = await fetch(`${USERS_API}/${userIdToFollow}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUserToFollow),
  });

  if (!resUpdateUserToFollow.ok) throw new Error("Failed to follow user.");

  return updatedUser;
}

export async function unfollowUser(currentUserId, userIdToUnfollow) {
  // fetch current user
  const resUser = await fetch(`${USERS_API}/${currentUserId}`);
  if (!resUser.ok) throw new Error("Failed to fetch current user.");
  const user = await resUser.json();

  // update followingIds (current user)
  const updatedUser = {
    ...user,
    followingIds: (user.followingIds || []).filter(
      (id) => id !== userIdToUnfollow
    ),
  };

  const resUpdate = await fetch(`${USERS_API}/${currentUserId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });

  if (!resUpdate.ok) throw new Error("Failed to unfollow user.");

  // fetch user to unfollow
  const resUserToUnfollow = await fetch(`${USERS_API}/${userIdToUnfollow}`);
  if (!resUserToUnfollow.ok)
    throw new Error("Failed to fetch user to unfollow.");

  const userToUnfollow = await resUserToUnfollow.json();

  // update followerIds (other user)
  const updatedUserToUnfollow = {
    ...userToUnfollow,
    followerIds: (userToUnfollow.followerIds || []).filter(
      (id) => id !== currentUserId
    ),
  };

  const resUpdateUserToUnfollow = await fetch(
    `${USERS_API}/${userIdToUnfollow}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUserToUnfollow),
    }
  );

  if (!resUpdateUserToUnfollow.ok) throw new Error("Failed to unfollow user.");

  return updatedUser;
}
