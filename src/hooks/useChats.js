import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createChat,
  deleteMessage,
  editMessage,
  fetchChatById,
  fetchChatByParticipantsId,
  fetchLastMessage,
  // fetchChats,
  fetchUsersChats,
  markMessagesAsRead,
  sendMessage,
} from "../services-with-supabase/apiChats";

// export function useChats() {
//   return useQuery({
//     queryKey: ["chats"],
//     queryFn: fetchChats,
//   });
// }

export function useChatById(chatId) {
  return useQuery({
    queryKey: ["chats", chatId],
    queryFn: () => fetchChatById(chatId),
    enabled: !!chatId, // !! to convert to boolean, without "enabled" react query might do GET/chats/undefined, which's bad
  });
}

export function useUsersChats(currentUserId) {
  return useQuery({
    queryKey: ["chats", currentUserId],
    queryFn: () => fetchUsersChats(currentUserId),
  });
}

export function useChatByParticipantsId(userId1, userId2) {
  return useQuery({
    queryKey: ["chats", "participants", userId1, userId2],
    queryFn: () => fetchChatByParticipantsId(userId1, userId2),
    enabled: !!userId1 && !!userId2, // only fetch if both IDs are defined
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["chats", chatId] });
      queryClient.invalidateQueries({ queryKey: ["lastMessage", chatId] });
    },
  });
}

export function useCreateChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChat,
    onSuccess: () => queryClient.invalidateQueries(["chats"]),
  });
}

export function useEditMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editMessage,
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries(["chats"]);
      queryClient.invalidateQueries(["chats", chatId]);
    },
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries(["chats"]);
      queryClient.invalidateQueries(["chats", chatId]);
    },
  });
}

export function useLastMessage(chatId) {
  return useQuery({
    queryKey: ["lastMessage", chatId],
    queryFn: () => fetchLastMessage(chatId),
    enabled: !!chatId,
  });
}

export function useMarkChatAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chatId, userId }) => markMessagesAsRead(chatId, userId),
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({ queryKey: ["lastMessage", chatId] });
    },
  });
}
