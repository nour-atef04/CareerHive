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

  const followings = allUsers.filter((u) => user.followingIds?.includes(u.id));
  return followings;
}

// for follow/unfollow
export async function updateUser(updatedUser) {
  const res = await fetch(`${USERS_API}/${updatedUser.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });
  if (!res.ok) throw new Error("Failed to update user.");
  return res.json();
}
