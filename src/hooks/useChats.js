import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createChat,
  deleteMessage,
  editMessage,
  fetchChatById,
  fetchChatByParticipantsId,
  fetchChats,
  sendMessage,
} from "../services/apiChats";

export function useChats() {
  return useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
  });
}

export function useChatById(chatId) {
  return useQuery({
    queryKey: ["chats", chatId],
    queryFn: () => fetchChatById(chatId),
    enabled: !!chatId, // !! to convert to boolean, without "enabled" react query might do GET/chats/undefined, which's bad
  });
}

export function useChatByParticipantsId(userId1, userId2) {
  return useQuery({
    queryKey: ["chats", userId1, userId2],
    queryFn: ({ queryKey }) => {
      const [, id1, id2] = queryKey; // unpack user IDs from queryKey
      return fetchChatByParticipantsId(id1, id2);
    },
    enabled: !!userId1 && !!userId2, // only fetch if both IDs are defined
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries(["chats"]); // update chats list
      queryClient.invalidateQueries(["chats", chatId]); // update single chat
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
