// i refactored fetching chats from it being
// Redux async thunks + local form state
// to React Query + React Hook Form

import { fetchUsers } from "./apiUsers";

export async function fetchChats() {
  const res = await fetch("http://localhost:3001/chats");
  if (!res.ok) throw new Error("Failed to fetch chats.");
  return res.json();
}

export async function fetchUsersChats(currentUserId) {
  const chats = await fetchChats();
  const allUsers = await fetchUsers();

  // only chats that include current user
  const userChats = chats.filter((chat) =>
    chat.participantsIds.includes(currentUserId)
  );

  // get all participants except current user
  // flatMap to do this [2, 3, 4] instead of this [[2, 3], [4]]
  const participants = userChats.flatMap((chat) =>
    chat.participantsIds.filter((id) => id !== currentUserId)
  );

  // Remove duplicates
  const uniqueParticipantIds = [...new Set(participants)];

  // Map IDs to full user objects
  // .filter(Boolean) to remove undefined entries
  return uniqueParticipantIds
    .map((id) => allUsers.find((u) => u.id === id))
    .filter(Boolean);
}

export async function fetchChatById(chatId) {
  const res = await fetch(`http://localhost:3001/chats/${chatId}`);
  if (!res.ok) throw new Error("Failed to fetch chat.");
  return res.json();
}

export async function fetchChatByParticipantsId(userId1, userId2) {
  const chats = await fetchChats();
  return chats.find(
    (c) =>
      c.participantsIds.includes(userId1) && c.participantsIds.includes(userId2)
  );
}

export async function sendMessage({ chatId, senderId, text }) {
  const newMessage = {
    id: Date.now().toString(),
    senderId,
    text,
    timestamp: new Date().toISOString(),
  };

  // getting existing thread of chatId
  const res = await fetch(`http://localhost:3001/chats/${chatId}`);
  const thread = await res.json();

  // update chat to add new msg
  const updatedChat = {
    ...thread,
    messages: [...thread.messages, newMessage],
  };

  // save to backend
  await fetch(`http://localhost:3001/chats/${chatId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedChat),
  });
}

export async function createChat({ senderId, receiverId, text }) {
  const newMessage = {
    id: Date.now().toString(),
    senderId,
    text,
    timestamp: new Date().toISOString(),
  };

  const newChat = {
    id: Date.now().toString(),
    participantsIds: [senderId, receiverId],
    messages: [newMessage],
  };

  await fetch("http://localhost:3001/chats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newChat),
  });
}

export async function editMessage({ chatId, messageId, newText }) {
  const res = await fetch(`http://localhost:3001/chats/${chatId}`);
  const chat = await res.json();

  const updatedChat = {
    ...chat,
    messages: chat.messages.map((msg) =>
      msg.id === messageId ? { ...msg, text: newText } : msg
    ),
  };

  await fetch(`http://localhost:3001/chats/${chatId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedChat),
  });
}

export async function deleteMessage({ chatId, messageId }) {
  const res = await fetch(`http://localhost:3001/chats/${chatId}`);
  const chat = await res.json();

  const updatedChat = {
    ...chat,
    messages: chat.messages.filter((msg) => msg.id !== messageId),
  };

  await fetch(`http://localhost:3001/chats/${chatId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedChat),
  });
}
