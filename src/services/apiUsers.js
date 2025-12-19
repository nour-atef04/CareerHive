const USERS_API = "http://localhost:3001/users";

export async function fetchUsers() {
  const res = await fetch(USERS_API);
  if (!res.ok) throw new Error("Failed to fetch users.");
  return res.json();
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
