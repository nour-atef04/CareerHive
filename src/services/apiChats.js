// i refactored fetching chats from it being
// Redux async thunks + local form state
// to React Query + React Hook Form

export async function fetchChats() {
  const res = await fetch("http://localhost:3001/chats");
  if (!res.ok) throw new Error("Failed to fetch chats.");
  return res.json();
}

export async function fetchChatById(chatId) {
  const res = await fetch(`http://localhost:3001/chats/${chatId}`);
  if (!res.ok) throw new Error("Failed to fetch chat.");
  return res.json();
}

export async function sendMessage({ chatId, sender, text }) {
  const newMessage = {
    id: Date.now().toString(),
    sender,
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

export async function createChat({ sender, receiver, text }) {
  const newMessage = {
    id: Date.now().toString(),
    sender,
    text,
    timestamp: new Date().toISOString(),
  };

  const newChat = {
    id: Date.now().toString(),
    participants: [sender, receiver],
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
