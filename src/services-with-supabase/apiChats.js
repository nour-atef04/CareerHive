// i refactored fetching chats from it being
// Redux async thunks + local form state
// to React Query + React Hook Form

import supabase from "./supabase";

export async function fetchUsersChats(currentUserId) {
  // get chat ids
  const { data: participations, error } = await supabase
    .from("chat_participants")
    .select("chatId")
    .eq("userId", currentUserId);

  // console.log(participations);

  if (error) throw new Error("Failed to fetch chats");

  const chatIds = participations.map((p) => p.chatId);
  // console.log(chatIds);

  if (chatIds.length === 0) return [];

  // fetch other participants + last msg
  const { data, error: chatsError } = await supabase
    .from("chat_participants")
    .select(
      `
    chatId, profiles(id, name, position, image), chats(messages(id, text, senderId, createdAt))`,
    )
    .in("chatId", chatIds)
    .neq("userId", currentUserId);

  if (chatsError) throw new Error("Failed to fetch chats");

  // console.log(data);

  return data.map((row) => {
    const messages = row.chats?.messages ?? [];
    const lastMessage =
      messages.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      )[0] ?? null;

    return {
      chatId: row.chatId,
      participant: row.profiles,
      lastMessage,
    };
  });
}

export async function fetchChatById(chatId) {
  const { data, error } = await supabase
    .from("messages")
    .select(
      `
    id, text, senderId, createdAt, profiles(id, name, image)
    `,
    )
    .eq("chatId", chatId)
    .order("createdAt", { ascending: true });

  if (error) throw new Error("Failed to fetch chat messages");
  return data;
}

export async function fetchChatByParticipantsId(userId1, userId2) {
  // get chats userId1 participates in
  const { data: chats1, error } = await supabase
    .from("chat_participants")
    .select("chatId")
    .eq("userId", userId1);

  if (error) throw new Error("Failed to fetch chat");

  if (!chats1 || chats1.length === 0) return null;

  const chatIds1 = chats1.map((c) => c.chatId);

  const { data: match, error: matchError } = await supabase
    .from("chat_participants")
    .select("chatId")
    .in("chatId", chatIds1)
    .eq("userId", userId2)
    .maybeSingle(); // for when no chat

  // console.log(chatIds1);
  console.log(match);

  if (matchError) throw new Error("Failed to fetch chat");

  return match ? match.chatId : null;
}

export async function sendMessage({ chatId, senderId, text }) {
  const { error } = await supabase.from("messages").insert([
    {
      chatId,
      senderId,
      text,
    },
  ]);

  if (error) throw new Error("Failed to send message.");
}

export async function createChat({ senderId, receiverId, text }) {
  // create chat
  const { data: chat, error } = await supabase
    .from("chats")
    .insert({})
    .select()
    .single();

  const chatId = chat.id;

  // if (error) throw new Error("Failed to initialize chat");
  if (error || !chat) {
    console.error("Chat creation error:", error);
    throw new Error("Failed to create chat. Check your database permissions.");
  }

  // add participants
  const { error: participantsError } = await supabase
    .from("chat_participants")
    .insert([
      {
        chatId: chatId,
        userId: senderId,
      },
      {
        chatId: chatId,
        userId: receiverId,
      },
    ]);

  if (participantsError) throw new Error("Failed to add participants.");

  // send 1st msg
  await sendMessage({
    chatId,
    senderId,
    text,
  });

  return chatId;
}

export async function editMessage({ chatId, messageId, newText }) {
  const { error } = await supabase
    .from("messages")
    .update({ text: newText })
    .eq("id", messageId);

  if (error) throw new Error("Failed to edit message.");
}

export async function deleteMessage({ chatId, messageId }) {
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", messageId);

  if (error) throw new Error("Failed to delete message.");
}

export async function fetchLastMessage(chatId) {
  const { data, error } = await supabase
    .from("messages")
    .select("text, createdAt, senderId, read")
    .eq("chatId", chatId)
    .order("createdAt", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") {
    // ignore "Row not found" error (no messages yet)
    throw new Error("Failed to fetch last message");
  }

  return data;
}

export async function markMessagesAsRead(chatId, currentUserId) {
  const { error } = await supabase
    .from("messages")
    .update({ read: true })
    .eq("chatId", chatId)
    .neq("senderId", currentUserId) 
    .eq("read", false); 

  if (error) throw new Error(error.message);
}
