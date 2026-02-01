import supabase from "./supabase";

export async function fetchNotifications(userId) {
  const { data, error } = await supabase
    .from("notifications")
    .select(
      `
      *,
      sender:profiles!senderId(name, image),
      post:posts(text)
    `,
    )
    .eq("recipientId", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error("Could not load notifications");
  return data;
}

export async function createNotification({
  recipientId,
  senderId,
  type,
  postId,
}) {
  // don't notify if user likes their own post
  if (recipientId === senderId) return;

  // check if notification already exists (prevent duplicate spam)
  if (type === "like" || type === "repost") {
    const { data } = await supabase
      .from("notifications")
      .select("id")
      .eq("senderId", senderId)
      .eq("postId", postId)
      .eq("type", type)
      .single();

    if (data) return; // skip if exists
  }

  const { error } = await supabase
    .from("notifications")
    .insert([{ recipientId, senderId, type, postId }]);

  if (error) console.error("Notification error:", error);
}
